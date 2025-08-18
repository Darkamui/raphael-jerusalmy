import Redis from 'ioredis';

export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  del(key: string): Promise<void>;
  clear(): Promise<void>;
  isConnected(): boolean;
  getStats(): { redisConnected: boolean; memoryEntries: number; cacheType: string };
}

/**
 * Redis cache service with automatic fallback to in-memory cache
 */
export class RedisCacheService implements CacheService {
  private redis: Redis | null = null;
  private fallbackCache: Map<string, { data: unknown; timestamp: number; ttl: number }> = new Map();
  private connected: boolean = false;
  private readonly DEFAULT_TTL = 5 * 60; // 5 minutes in seconds

  constructor() {
    this.initializeRedis();
  }

  private async initializeRedis(): Promise<void> {
    try {
      // Only attempt Redis connection if URL is provided
      const redisUrl = process.env.REDIS_URL;
      
      if (!redisUrl) {
        console.warn('Redis URL not provided, using in-memory cache fallback');
        return;
      }

      this.redis = new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        connectTimeout: 5000,
        lazyConnect: true,
        // Graceful degradation settings
        enableReadyCheck: true,
        showFriendlyErrorStack: true,
      });

      // Test connection
      await this.redis.ping();
      this.connected = true;
      console.warn('Redis cache service connected successfully');

      // Handle Redis errors gracefully
      this.redis.on('error', (error) => {
        console.warn('Redis connection error, falling back to in-memory cache:', error.message);
        this.connected = false;
      });

      this.redis.on('connect', () => {
        console.warn('Redis reconnected');
        this.connected = true;
      });

    } catch (error) {
      console.warn('Failed to connect to Redis, using in-memory cache:', (error as Error).message);
      this.connected = false;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      // Try Redis first if connected
      if (this.redis && this.connected) {
        const value = await this.redis.get(key);
        if (value) {
          return JSON.parse(value) as T;
        }
        return null;
      }
      
      // Fallback to in-memory cache
      return this.getFromMemory<T>(key);
    } catch (error) {
      console.warn(`Cache get error for key ${key}:`, (error as Error).message);
      return this.getFromMemory<T>(key);
    }
  }

  async set<T>(key: string, value: T, ttlSeconds: number = this.DEFAULT_TTL): Promise<void> {
    try {
      // Try Redis first if connected
      if (this.redis && this.connected) {
        const serialized = JSON.stringify(value);
        await this.redis.setex(key, ttlSeconds, serialized);
        return;
      }
      
      // Fallback to in-memory cache
      this.setInMemory(key, value, ttlSeconds);
    } catch (error) {
      console.warn(`Cache set error for key ${key}:`, (error as Error).message);
      this.setInMemory(key, value, ttlSeconds);
    }
  }

  async del(key: string): Promise<void> {
    try {
      // Try Redis first if connected
      if (this.redis && this.connected) {
        await this.redis.del(key);
      }
      
      // Also remove from memory cache
      this.fallbackCache.delete(key);
    } catch (error) {
      console.warn(`Cache delete error for key ${key}:`, (error as Error).message);
      this.fallbackCache.delete(key);
    }
  }

  async clear(): Promise<void> {
    try {
      // Try Redis first if connected
      if (this.redis && this.connected) {
        await this.redis.flushdb();
      }
      
      // Also clear memory cache
      this.fallbackCache.clear();
    } catch (error) {
      console.warn('Cache clear error:', (error as Error).message);
      this.fallbackCache.clear();
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  private getFromMemory<T>(key: string): T | null {
    const cached = this.fallbackCache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl * 1000) {
      return cached.data as T;
    }
    
    // Remove expired entries
    if (cached) {
      this.fallbackCache.delete(key);
    }
    
    return null;
  }

  private setInMemory<T>(key: string, value: T, ttlSeconds: number): void {
    this.fallbackCache.set(key, {
      data: value,
      timestamp: Date.now(),
      ttl: ttlSeconds,
    });
  }

  /**
   * Clean up expired entries from memory cache
   */
  cleanupExpired(): void {
    const now = Date.now();
    for (const [key, cached] of this.fallbackCache.entries()) {
      if (now - cached.timestamp >= cached.ttl * 1000) {
        this.fallbackCache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): { redisConnected: boolean; memoryEntries: number; cacheType: string } {
    return {
      redisConnected: this.connected,
      memoryEntries: this.fallbackCache.size,
      cacheType: this.connected ? 'Redis' : 'In-Memory',
    };
  }

  /**
   * Gracefully close the Redis connection
   */
  async disconnect(): Promise<void> {
    if (this.redis) {
      await this.redis.quit();
      this.connected = false;
    }
  }
}

// Singleton instance
let cacheServiceInstance: RedisCacheService | null = null;

export function getCacheService(): RedisCacheService {
  if (!cacheServiceInstance) {
    cacheServiceInstance = new RedisCacheService();
  }
  return cacheServiceInstance;
}
import { NextResponse } from "next/server";
import { DataService } from '@/lib/services/data.service';

export async function GET() {
  try {
    const dataService = DataService.getInstance();
    const cacheStats = dataService.getCacheStats();
    
    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || "unknown",
      environment: process.env.NODE_ENV || "development",
      cache: {
        type: cacheStats.cacheType,
        redisConnected: cacheStats.redisConnected,
        memoryEntries: cacheStats.memoryEntries,
      },
      services: {
        database: 'connected',
        cache: cacheStats.redisConnected ? 'redis' : 'memory',
      }
    };

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        cache: {
          type: "unknown",
          redisConnected: false,
          memoryEntries: 0,
        },
        services: {
          database: 'error',
          cache: 'error',
        }
      },
      { status: 503 }
    );
  }
}
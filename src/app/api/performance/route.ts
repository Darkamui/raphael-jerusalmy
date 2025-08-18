import { NextResponse } from "next/server";
import { getPerformanceMonitor } from '@/lib/utils/performance-monitor';

export async function GET() {
  try {
    const performanceMonitor = getPerformanceMonitor();
    const summary = performanceMonitor.getSummary();
    
    return NextResponse.json({
      status: summary.passedBudget ? 'passing' : 'failing',
      timestamp: new Date().toISOString(),
      summary,
      budget: {
        maxBundleSize: '400KB',
        maxChunkSize: '150KB',
        coreWebVitals: {
          lcp: { good: '2.5s', needsImprovement: '4.0s' },
          cls: { good: '0.1', needsImprovement: '0.25' },
          fcp: { good: '1.8s', needsImprovement: '3.0s' },
          ttfb: { good: '0.8s', needsImprovement: '1.8s' },
        }
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: "error", 
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bundleSize, chunkSizes } = body;
    
    const performanceMonitor = getPerformanceMonitor();
    const withinBudget = performanceMonitor.checkBundleSize(bundleSize, chunkSizes);
    
    return NextResponse.json({
      status: withinBudget ? 'passed' : 'failed',
      bundleSize: `${(bundleSize / 1024).toFixed(1)}KB`,
      budget: '400KB',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: "error", 
        error: error instanceof Error ? error.message : "Invalid request",
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }
}
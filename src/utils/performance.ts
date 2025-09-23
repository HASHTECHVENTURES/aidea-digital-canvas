// Performance monitoring utilities for AIdea Digital Website

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    // Monitor Core Web Vitals
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();
    
    // Monitor page load time
    this.measureLoadTime();
  }

  private observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.largestContentfulPaint = lastEntry.startTime;
      this.logMetric('LCP', lastEntry.startTime);
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.push(observer);
  }

  private observeFID() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
        this.logMetric('FID', this.metrics.firstInputDelay);
      });
    });
    
    observer.observe({ entryTypes: ['first-input'] });
    this.observers.push(observer);
  }

  private observeCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.metrics.cumulativeLayoutShift = clsValue;
      this.logMetric('CLS', clsValue);
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
    this.observers.push(observer);
  }

  private observeFCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.metrics.firstContentfulPaint = entry.startTime;
        this.logMetric('FCP', entry.startTime);
      });
    });
    
    observer.observe({ entryTypes: ['paint'] });
    this.observers.push(observer);
  }

  private measureLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.metrics.loadTime = loadTime;
      this.logMetric('Load Time', loadTime);
      
      // Measure Time to Interactive
      this.measureTTI();
    });
  }

  private measureTTI() {
    // Simple TTI measurement
    const tti = performance.now();
    this.metrics.timeToInteractive = tti;
    this.logMetric('TTI', tti);
  }

  private logMetric(name: string, value: number) {
    console.log(`📊 Performance Metric - ${name}: ${value.toFixed(2)}ms`);
    
    // Send to analytics (if implemented)
    this.sendToAnalytics(name, value);
  }

  private sendToAnalytics(name: string, value: number) {
    // Placeholder for analytics integration
    // You can integrate with Google Analytics, Mixpanel, etc.
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        page_location: window.location.href
      });
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public getPerformanceScore(): number {
    const metrics = this.metrics;
    let score = 100;

    // LCP scoring (Good: <2.5s, Needs Improvement: 2.5-4s, Poor: >4s)
    if (metrics.largestContentfulPaint) {
      if (metrics.largestContentfulPaint > 4000) score -= 30;
      else if (metrics.largestContentfulPaint > 2500) score -= 15;
    }

    // FID scoring (Good: <100ms, Needs Improvement: 100-300ms, Poor: >300ms)
    if (metrics.firstInputDelay) {
      if (metrics.firstInputDelay > 300) score -= 25;
      else if (metrics.firstInputDelay > 100) score -= 10;
    }

    // CLS scoring (Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25)
    if (metrics.cumulativeLayoutShift) {
      if (metrics.cumulativeLayoutShift > 0.25) score -= 25;
      else if (metrics.cumulativeLayoutShift > 0.1) score -= 10;
    }

    return Math.max(0, score);
  }

  public cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Create global instance
export const performanceMonitor = new PerformanceMonitor();

// Export for use in components
export const trackPerformance = (action: string, startTime: number) => {
  const duration = performance.now() - startTime;
  console.log(`⏱️ Performance - ${action}: ${duration.toFixed(2)}ms`);
  return duration;
};

// Export for measuring component render times
export const measureComponent = (componentName: string) => {
  const startTime = performance.now();
  return () => {
    const duration = performance.now() - startTime;
    console.log(`🎯 Component - ${componentName}: ${duration.toFixed(2)}ms`);
    return duration;
  };
};

export default PerformanceMonitor;

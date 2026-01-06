import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Index from "./pages/Index";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { performanceMonitor } from "./utils/performance";
import { SkeletonCard, SkeletonText } from "./components/ui/Skeleton";

// Lazy load heavy components for better performance
const Community = lazy(() => import("./pages/Community"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Admin = lazy(() => import("./pages/Admin"));
const Contact = lazy(() => import("./pages/Contact"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading component for Suspense
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-950">
    <div className="w-full max-w-md space-y-4">
      <SkeletonCard />
      <SkeletonText lines={3} />
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    // Initialize performance monitoring (only in development)
    if (import.meta.env.DEV) {
      console.log('🚀 AIdea Digital Website - Performance monitoring enabled');
      
      // Log performance score after page load
      setTimeout(() => {
        const score = performanceMonitor.getPerformanceScore();
        console.log(`📊 Performance Score: ${score}/100`);
        
        if (score < 70) {
          console.warn('⚠️ Performance score is below 70. Consider optimization.');
        }
      }, 3000);
    }

    // Cleanup on unmount
    return () => {
      if (import.meta.env.DEV) {
        performanceMonitor.cleanup();
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gray-950">
                <Navigation />
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/case-studies" element={<CaseStudies />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <Footer />
              </div>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
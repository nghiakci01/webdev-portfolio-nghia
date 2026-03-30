import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import ErrorBoundary from "@/components/ErrorBoundary";
import { initializeGoogleAnalytics } from "@/lib/analytics";
import { logEnvironmentConfig, validateEnvironmentVariables } from "@/lib/env";
import { usePageTracking } from "@/hooks/use-page-tracking";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Inner component to use hooks
const AppContent = () => {
  usePageTracking();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // Initialize analytics on mount
  useEffect(() => {
    // Validate environment variables
    validateEnvironmentVariables();
    
    // Log configuration in development
    logEnvironmentConfig();
    
    // Initialize Google Analytics if configured
    initializeGoogleAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;

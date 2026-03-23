import React, { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary Component
 * Catches and displays errors in child components
 * Prevents the entire app from crashing due to component errors
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to an error reporting service
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="max-w-md w-full">
            {/* Alert Card */}
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
              {/* Icon */}
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="size-6 text-destructive flex-shrink-0" />
                <h2 className="text-lg font-semibold text-foreground">
                  Oops! Something went wrong
                </h2>
              </div>

              {/* Error Message */}
              <p className="text-sm text-muted-foreground mb-4">
                We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
              </p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-4">
                  <summary className="cursor-pointer text-xs font-mono text-muted-foreground hover:text-foreground">
                    Error Details (Development Only)
                  </summary>
                  <pre className="mt-2 p-2 bg-secondary rounded text-xs overflow-auto max-h-32 text-destructive">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="flex-1 px-4 py-2 border border-input bg-background rounded hover:bg-accent transition-colors text-sm font-medium"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

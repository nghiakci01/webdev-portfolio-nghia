import { Loader2 } from 'lucide-react';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

/**
 * Loader Component
 * Displays a loading spinner with optional text
 * 
 * @param size - Size of the spinner: 'sm' (20px), 'md' (32px), 'lg' (48px)
 * @param text - Optional loading text to display below spinner
 * @param fullScreen - If true, centers loader on full screen with backdrop
 */
export function Loader({ size = 'md', text, fullScreen = false }: LoaderProps) {
  const sizeMap = {
    sm: 20,
    md: 32,
    lg: 48,
  };

  const spinnerSize = sizeMap[size];

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 
            size={spinnerSize} 
            className="animate-spin text-primary"
            aria-busy="true"
            role="status"
          />
          {text && <p className="text-sm text-muted-foreground">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Loader2 
        size={spinnerSize} 
        className="animate-spin text-primary"
        aria-busy="true"
        role="status"
      />
      {text && <p className="text-xs text-muted-foreground">{text}</p>}
    </div>
  );
}

export default Loader;

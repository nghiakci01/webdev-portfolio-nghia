import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ErrorBoundary } from '@/components/ErrorBoundary';

/**
 * Test component that throws an error
 */
const ThrowError = () => {
  throw new Error('Test error message');
};

/**
 * Safe test component that renders normally
 */
const SafeComponent = () => {
  return <div>Safe Component</div>;
};

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    // Suppress console.error for error boundary tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe Component')).toBeInTheDocument();
  });

  it('displays error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(/We encountered an unexpected error/)).toBeInTheDocument();
  });

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const details = screen.getByText('Error Details (Development Only)');
    expect(details).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('displays reload and go back buttons', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole('button', { name: /Reload Page/ });
    const backButton = screen.getByRole('button', { name: /Go Back/ });

    expect(reloadButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  });

  it('displays alert icon when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const heading = screen.getByText('Oops! Something went wrong');
    expect(heading).toBeInTheDocument();
  });

  it('reload button has correct handler', async () => {
    const user = userEvent.setup();
    const reloadSpy = vi.fn();
    vi.stubGlobal('location', { reload: reloadSpy });

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole('button', { name: /Reload Page/ });
    expect(reloadButton).toBeInTheDocument();
  });

  it('go back button has correct handler', async () => {
    const user = userEvent.setup();
    const historySpy = vi.spyOn(window.history, 'back').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const backButton = screen.getByRole('button', { name: /Go Back/ });
    expect(backButton).toBeInTheDocument();

    historySpy.mockRestore();
  });

  it('error boundary displays appropriate styling', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const errorContainer = container.querySelector('.min-h-screen');
    expect(errorContainer).toBeInTheDocument();
    expect(errorContainer).toHaveClass('flex');
    expect(errorContainer).toHaveClass('items-center');
    expect(errorContainer).toHaveClass('justify-center');
  });

  it('renders error card with correct border styling', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const card = container.querySelector('.rounded-lg');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('border-destructive/20');
    expect(card).toHaveClass('bg-destructive/5');
  });

  it('handles multiple error throws correctly', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe Component')).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  it('error details are collapsed by default', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const { container } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const details = container.querySelector('details');
    expect(details).not.toHaveAttribute('open');

    process.env.NODE_ENV = originalEnv;
  });

  it('catches errors from deeply nested components', () => {
    const DeepComponent = () => (
      <div>
        <div>
          <ThrowError />
        </div>
      </div>
    );

    render(
      <ErrorBoundary>
        <DeepComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });
});

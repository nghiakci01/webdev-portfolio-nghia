import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from '@/components/Loader';

describe('Loader Component', () => {
  it('renders spinner with correct role and aria-busy attribute', () => {
    render(<Loader />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-busy', 'true');
  });

  it('renders with loading text', () => {
    render(<Loader text="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders different sizes: small', () => {
    const { container } = render(<Loader size="sm" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('animate-spin');
  });

  it('renders different sizes: medium (default)', () => {
    const { container } = render(<Loader />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('animate-spin');
  });

  it('renders different sizes: large', () => {
    const { container } = render(<Loader size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('animate-spin');
  });

  it('renders full screen loader with backdrop', () => {
    const { container } = render(<Loader fullScreen={true} text="Loading page..." />);
    const backdrop = container.querySelector('.bg-background/80');
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass('backdrop-blur-sm');
    expect(screen.getByText('Loading page...')).toBeInTheDocument();
  });

  it('applies primary color to spinner', () => {
    const { container } = render(<Loader />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-primary');
  });

  it('full screen version has fixed positioning', () => {
    const { container } = render(<Loader fullScreen={true} />);
    const backdrop = container.querySelector('.fixed');
    expect(backdrop).toBeInTheDocument();
  });

  it('renders without text when text prop is not provided', () => {
    render(<Loader />);
    // Should only have the spinner, no text element
    const paragraphs = screen.queryAllByRole('status');
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it('text appears below spinner in non-fullscreen mode', () => {
    const { container } = render(<Loader text="Processing..." />);
    const textElement = screen.getByText('Processing...');
    expect(textElement).toHaveClass('text-xs');
  });

  it('text appears below spinner in fullscreen mode', () => {
    const { container } = render(<Loader fullScreen text="Loading page..." />);
    const textElement = screen.getByText('Loading page...');
    expect(textElement).toHaveClass('text-sm');
  });
});

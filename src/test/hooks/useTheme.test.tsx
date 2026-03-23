import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme, ThemeProvider } from "@/hooks/use-theme";

describe("useTheme Hook", () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    // Reset HTML class
    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("returns initial dark theme", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe("dark");
  });

  it("toggles theme from dark to light", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe("dark");

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("light");
  });

  it("toggles theme from light to dark", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("light");

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");
  });

  it("persists theme to localStorage", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("applies dark class to document element", () => {
    document.documentElement.classList.add("dark");
    const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    
    act(() => {
      result.current.toggleTheme();
    });

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("throws error when used outside ThemeProvider", () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("useTheme must be used within a ThemeProvider");
  });
});

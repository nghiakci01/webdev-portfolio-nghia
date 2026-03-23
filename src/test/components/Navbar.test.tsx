import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../components/Navbar";

// Mock the hooks
import * as ThemeHooks from "@/hooks/use-theme";
import * as ActiveSectionHooks from "@/hooks/use-active-section";

describe("Navbar Component", () => {
  beforeEach(() => {
    // Mock useTheme hook
    const mockUseTheme = () => ({
      theme: "dark",
      toggleTheme: () => {},
    });
    vi.spyOn(ThemeHooks, "useTheme").mockImplementation(mockUseTheme);

    // Mock useActiveSection hook
    const mockUseActiveSection = () => "hero";
    vi.spyOn(ActiveSectionHooks, "useActiveSection").mockImplementation(mockUseActiveSection);
  });

  it("renders navbar with logo", () => {
    render(<Navbar />);
    expect(screen.getByText(/<NTN \/>/)).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    render(<Navbar />);
    expect(screen.getByText("Trang chủ")).toBeInTheDocument();
    expect(screen.getByText("Giới thiệu")).toBeInTheDocument();
    expect(screen.getByText("Kỹ năng")).toBeInTheDocument();
    expect(screen.getByText("Dự án")).toBeInTheDocument();
    expect(screen.getByText("Liên hệ")).toBeInTheDocument();
  });

  it("renders theme toggle button", () => {
    render(<Navbar />);
    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    expect(themeButton).toBeInTheDocument();
  });

  it("renders mobile menu toggle button", () => {
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it("has fixed positioning", () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");
    expect(nav?.className).toContain("fixed");
    expect(nav?.className).toContain("top-0");
    expect(nav?.className).toContain("z-50");
  });

  it("has correct CSS classes", () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");
    expect(nav?.className).toContain("transition-all");
    expect(nav?.className).toContain("duration-300");
  });

  it("renders navigation links with correct hrefs", () => {
    render(<Navbar />);
    const navLinks = screen.getAllByRole("link");
    const logos = navLinks.filter((link) => link.textContent?.includes("NTN"));
    expect(logos[0]).toHaveAttribute("href", "#hero");
  });

  it("logo links to hero section", () => {
    render(<Navbar />);
    const logo = screen.getByText(/<NTN \/>/);
    expect(logo.closest("a")).toHaveAttribute("href", "#hero");
  });

  it("has semantic HTML structure", () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
    const list = container.querySelector("ul");
    expect(list).toBeInTheDocument();
  });
});

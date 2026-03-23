import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "../components/Hero";

describe("Hero Component", () => {
  it("renders hero section with correct heading", () => {
    render(<Hero />);
    expect(screen.getByText(/Nguyễn Tuấn/i)).toBeInTheDocument();
    expect(screen.getByText(/Nghĩa/i)).toBeInTheDocument();
  });

  it("renders web developer job title", () => {
    render(<Hero />);
    expect(screen.getByText("Web Developer")).toBeInTheDocument();
  });

  it("renders hero section with id attribute", () => {
    const { container } = render(<Hero />);
    const section = container.querySelector("#hero");
    expect(section).toBeInTheDocument();
  });

  it("renders call-to-action button linking to projects", () => {
    render(<Hero />);
    const button = screen.getByRole("link", { name: /Xem dự án/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "#projects");
  });

  it("renders avatar image", () => {
    render(<Hero />);
    const img = screen.getByAltText(/Nguyễn Tuấn Nghĩa/i);
    expect(img).toBeInTheDocument();
  });

  it("has required CSS classes for styling", () => {
    const { container } = render(<Hero />);
    const section = container.querySelector("#hero");
    expect(section?.className).toContain("section-container");
    expect(section?.className).toContain("min-h-screen");
  });
});

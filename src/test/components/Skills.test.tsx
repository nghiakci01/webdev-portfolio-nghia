import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Skills from "../components/Skills";

describe("Skills Component", () => {
  it("renders skills section with correct heading", () => {
    render(<Skills />);
    expect(screen.getByText(/Kỹ năng/i)).toBeInTheDocument();
  });

  it("renders skills section with id attribute", () => {
    const { container } = render(<Skills />);
    const section = container.querySelector("#skills");
    expect(section).toBeInTheDocument();
  });

  it("renders all skills from config", () => {
    render(<Skills />);
    // Check for some key skills
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
  });

  it("displays skill proficiency levels", () => {
    render(<Skills />);
    // Check if percentage levels are displayed
    const percentages = screen.getAllByText(/%/);
    expect(percentages.length).toBeGreaterThan(0);
  });

  it("renders skill bars for each skill", () => {
    const { container } = render(<Skills />);
    const skillBars = container.querySelectorAll(".skill-bar-track");
    expect(skillBars.length).toBeGreaterThan(0);
  });

  it("has correct CSS classes for styling", () => {
    const { container } = render(<Skills />);
    const section = container.querySelector("#skills");
    expect(section?.className).toContain("section-padding");
    expect(section?.className).toContain("bg-card");
  });

  it("contains gradient text for section title", () => {
    const { container } = render(<Skills />);
    const gradient = container.querySelector(".gradient-text");
    expect(gradient).toBeInTheDocument();
    expect(gradient?.textContent).toContain("Kỹ năng");
  });
});

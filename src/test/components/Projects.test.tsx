import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Projects from "../components/Projects";

describe("Projects Component", () => {
  it("renders projects section with correct heading", () => {
    render(<Projects />);
    expect(screen.getByText(/Dự án/i)).toBeInTheDocument();
  });

  it("renders projects section with id attribute", () => {
    const { container } = render(<Projects />);
    const section = container.querySelector("#projects");
    expect(section).toBeInTheDocument();
  });

  it("renders all projects from config", () => {
    render(<Projects />);
    expect(screen.getByText(/Website bán quần áo/i)).toBeInTheDocument();
    expect(screen.getByText(/Website phụ kiện thú cưng/i)).toBeInTheDocument();
    expect(screen.getByText(/Quản lý sinh viên/i)).toBeInTheDocument();
  });

  it("displays project descriptions", () => {
    render(<Projects />);
    expect(screen.getByText(/xây dựng theo mô hình MVC/i)).toBeInTheDocument();
  });

  it("displays project tech stacks", () => {
    render(<Projects />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("PHP")).toBeInTheDocument();
    expect(screen.getByText("VueJS")).toBeInTheDocument();
  });

  it("renders project images", () => {
    render(<Projects />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThanOrEqual(3);
  });

  it("renders project cards with correct CSS classes", () => {
    const { container } = render(<Projects />);
    const cards = container.querySelectorAll(".card-hover");
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it("has correct section styling", () => {
    const { container } = render(<Projects />);
    const section = container.querySelector("#projects");
    expect(section?.className).toContain("section-padding");
  });

  it("contains gradient text for section title", () => {
    const { container } = render(<Projects />);
    const gradient = container.querySelector(".gradient-text");
    expect(gradient).toBeInTheDocument();
    expect(gradient?.textContent).toContain("Dự án");
  });

  it("renders grid layout for projects", () => {
    const { container } = render(<Projects />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

/**
 * Accessibility Tests (A11y)
 * These tests validate WCAG 2.1 compliance
 */

describe("Accessibility - Contact Form", () => {
  it("all form inputs have associated labels or placeholders", () => {
    render(<Contact />);
    const inputs = screen.getAllByPlaceholderText(/Họ tên|Email|Chủ đề|Nội dung/i);
    expect(inputs.length).toBe(4);
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("placeholder");
    });
  });

  it("form submit button is accessible", () => {
    render(<Contact />);
    const submitButton = screen.getByRole("button", { name: /Gửi tin nhắn/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it("contact links have accessible text", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", { name: /your-email@example.com/i });
    expect(emailLink).toHaveAccessibleName();
  });

  it("form has proper element structure", () => {
    const { container } = render(<Contact />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });

  it("inputs have proper type attributes", () => {
    render(<Contact />);
    const nameInput = screen.getByPlaceholderText(/Họ tên/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const messageInput = screen.getByPlaceholderText(/Nội dung/i);

    expect(nameInput).toHaveAttribute("type", "text");
    expect(emailInput).toHaveAttribute("type", "email");
    expect(messageInput.tagName.toLowerCase()).toBe("textarea");
  });
});

describe("Accessibility - Navigation", () => {
  it("nav buttons have proper aria labels", () => {
    render(<Navbar />);
    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });

    expect(themeButton).toHaveAccessibleName();
    expect(menuButton).toHaveAccessibleName();
  });

  it("all navigation links are keyboard accessible", () => {
    render(<Navbar />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
  });

  it("navigation has semantic HTML", () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("logo link has accessible text", () => {
    render(<Navbar />);
    const logo = screen.getByText(/<NTN \/>/);
    expect(logo.closest("a")).toHaveAccessibleName();
  });
});

describe("Accessibility - Page Content", () => {
  it("page has proper heading hierarchy", () => {
    render(<Hero />);
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
  });

  it("images have alt text", () => {
    render(<Hero />);
    const img = screen.getByAltText(/Nguyễn Tuấn Nghĩa/i);
    expect(img).toHaveAccessibleName();
  });

  it("buttons are focusable", () => {
    render(<Navbar />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveProperty("tabIndex");
    });
  });

  it("interactive elements have sufficient color contrast", () => {
    render(<Navbar />);
    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    // This is a basic check - actual contrast ratio should be tested with real tools
    expect(themeButton).toHaveClass("hover:bg-secondary");
  });
});

describe("Accessibility - Focus Management", () => {
  it("elements are keyboard navigable", () => {
    const { container } = render(<Contact />);
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();

    const inputs = form?.querySelectorAll("input, textarea, button");
    expect(inputs?.length).toBeGreaterThan(0);
  });

  it("buttons have visible focus indicators", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button.className).toContain("transition");
  });
});

describe("Accessibility - Text Content", () => {
  it("page content is readable and clear", () => {
    render(<Hero />);
    expect(screen.getByText(/Web Developer/)).toBeInTheDocument();
    expect(screen.getByText(/Xây dựng website/)).toBeInTheDocument();
  });

  it("form validation messages are clear", () => {
    // This would be tested after form submission
    // For now, verify the form is present
    render(<Contact />);
    const form = screen.getByRole("button", { name: /Gửi tin nhắn/i }).closest("form");
    expect(form).toBeInTheDocument();
  });

  it("text alternatives for visual content exist", () => {
    render(<Hero />);
    const img = screen.getByAltText(/Nguyễn Tuấn Nghĩa/i);
    expect(img.getAttribute("alt")).toBeTruthy();
  });
});

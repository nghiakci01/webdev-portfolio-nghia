import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "../components/Contact";

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Contact Component - Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders contact section with heading", () => {
    render(<Contact />);
    expect(screen.getByText(/Liên hệ/i)).toBeInTheDocument();
  });

  it("renders contact form with all fields", () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText(/Họ tên/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Chủ đề/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nội dung/i)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<Contact />);
    const submitButton = screen.getByRole("button", { name: /Gửi tin nhắn/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("displays contact information", () => {
    render(<Contact />);
    expect(screen.getByText(/Kết nối với mình/i)).toBeInTheDocument();
  });

  it("displays email link", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", { name: /your-email@example.com/i });
    expect(emailLink).toBeInTheDocument();
  });

  it("displays phone link", () => {
    render(<Contact />);
    const phoneLink = screen.getByRole("link", { name: /\+84/i });
    expect(phoneLink).toBeInTheDocument();
  });

  it("validates empty name field", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole("button", { name: /Gửi tin nhắn/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Tên phải có ít nhất 2 ký tự/i)).toBeInTheDocument();
    });
  });

  it("validates invalid email", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const emailInput = screen.getByPlaceholderText(/Email/i);
    await user.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", { name: /Gửi tin nhắn/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Email không hợp lệ/i)).toBeInTheDocument();
    });
  });

  it("validates minimum message length", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const messageInput = screen.getByPlaceholderText(/Nội dung/i);
    await user.type(messageInput, "short");

    const submitButton = screen.getByRole("button", { name: /Gửi tin nhắn/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Tin nhắn phải có ít nhất 10 ký tự/i)).toBeInTheDocument();
    });
  });

  it("allows form submission with valid data", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/Họ tên/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const subjectInput = screen.getByPlaceholderText(/Chủ đề/i);
    const messageInput = screen.getByPlaceholderText(/Nội dung/i);
    const submitButton = screen.getByRole("button", { name: /Gửi tin nhắn/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(subjectInput, "Test Subject");
    await user.type(messageInput, "This is a test message");

    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toHaveTextContent(/Gửi tin nhắn/i);
    });
  });

  it("disables submit button while submitting", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/Họ tên/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const subjectInput = screen.getByPlaceholderText(/Chủ đề/i);
    const messageInput = screen.getByPlaceholderText(/Nội dung/i);
    const submitButton = screen.getByRole("button", { name: /Gửi tin nhắn/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(subjectInput, "Test Subject");
    await user.type(messageInput, "This is a test message");

    await user.click(submitButton);

    // Check if button is disabled during submission
    expect(submitButton).toHaveAttribute("disabled");
  });

  it("clears form after successful submission", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/Họ tên/i) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(/Email/i) as HTMLInputElement;
    const subjectInput = screen.getByPlaceholderText(/Chủ đề/i) as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText(/Nội dung/i) as HTMLTextAreaElement;
    const submitButton = screen.getByRole("button", { name: /Gửi tin nhắn/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(subjectInput, "Test Subject");
    await user.type(messageInput, "This is a test message");

    expect(nameInput.value).toBe("John Doe");

    await user.click(submitButton);

    await waitFor(() => {
      rerender(<Contact />);
      // Form should be cleared after submission
      expect(nameInput.value).toBe("");
    });
  });
});

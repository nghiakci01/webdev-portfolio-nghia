# Testing Guide

## Overview

This project uses **Vitest** and **Testing Library** for unit and integration testing. All tests are located in the `src/test/` directory.

## Installation

Most testing dependencies are already installed, but you may need to install some additional packages:

```bash
# Install testing libraries (if not already done)
npm install --save-dev @testing-library/react @testing-library/user-event vitest @vitest/ui jsdom

# Optional: For accessibility testing with axe-core
npm install --save-dev @axe-core/react
```

## Project Structure

```
src/test/
├── components/           # Component unit tests
│   ├── Hero.test.tsx
│   ├── Skills.test.tsx
│   ├── Projects.test.tsx
│   └── Navbar.test.tsx
├── hooks/               # Hook unit tests
│   └── useTheme.test.tsx
├── integration/         # Integration tests
│   └── ContactForm.test.tsx
├── accessibility/       # Accessibility tests
│   └── a11y.test.tsx
├── setup.ts             # Test configuration
└── example.test.ts      # Example test
```

## Running Tests

### Run all tests once
```bash
npm run test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with UI
```bash
npx vitest --ui
```

### Run specific test file
```bash
npx vitest src/test/components/Hero.test.tsx
```

### Run tests matching pattern
```bash
npx vitest --grep "Hero"
```

## Test Coverage

### Current Test Coverage

- **Components**: Hero, Skills, Projects, Navbar
- **Hooks**: useTheme, useActiveSection
- **Integration**: Contact form with validation
- **Accessibility**: A11y compliance checks

### Check Coverage Report
```bash
npx vitest --coverage
```

## Test Types

### 1. Unit Tests

Test individual components or functions in isolation.

**Example: Hero Component Test**
```bash
npm run test -- src/test/components/Hero.test.tsx
```

### 2. Integration Tests

Test multiple components working together, like form submission.

**Example: Contact Form Integration Test**
```bash
npm run test -- src/test/integration/ContactForm.test.tsx
```

### 3. Accessibility Tests

Verify WCAG 2.1 compliance and accessibility features.

**Example: A11y Tests**
```bash
npm run test -- src/test/accessibility/a11y.test.tsx
```

## Writing New Tests

### Basic Test Template

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyComponent from "@/components/MyComponent";

describe("MyComponent", () => {
  it("renders with correct text", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```typescript
import userEvent from "@testing-library/user-event";

it("handles click events", async () => {
  const user = userEvent.setup();
  render(<MyComponent />);
  
  const button = screen.getByRole("button");
  await user.click(button);
  
  expect(screen.getByText("Updated Text")).toBeInTheDocument();
});
```

### Testing Form Validation

```typescript
it("validates form fields", async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  
  const submitBtn = screen.getByRole("button", { name: /submit/i });
  await user.click(submitBtn);
  
  expect(screen.getByText(/error message/i)).toBeInTheDocument();
});
```

## Best Practices

1. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
2. **Test user behavior**: Focus on what users see and do, not implementation details
3. **Avoid implementation details**: Don't query internal state directly
4. **Use `screen` queries**: They encourage better testing practices
5. **Test accessibility**: Always include a11y checks
6. **Keep tests focused**: One test per behavior
7. **Use descriptive names**: Test names should explain what's being tested

## Common Testing Patterns

### Testing with Theme Context
```typescript
const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;
const { result } = renderHook(() => useTheme(), { wrapper });
```

### Testing Async Operations
```typescript
await waitFor(() => {
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

### Testing Form Submission
```typescript
const user = userEvent.setup();
await user.type(screen.getByPlaceholderText(/name/i), "John");
await user.click(screen.getByRole("button", { name: /submit/i }));
```

## Debugging Tests

### Debug Output
```typescript
render(<Component />);
screen.debug(); // Prints DOM to console
```

### Screen Queries
```typescript
// Find all elements matching
const elements = screen.getAllByRole("button");

// Find with specific text
const btn = screen.getByRole("button", { name: "Click me" });
```

### User Events
```typescript
const user = userEvent.setup();
// user.click(), user.type(), user.keyboard(), etc.
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run test
```

## Troubleshooting

### Tests Failing with Module Errors
- Ensure all imports use correct paths
- Check that components are properly exported
- Verify @alias is set in vitest.config.ts

### Hanging Tests
- Check for infinite loops in components
- Ensure all async operations are properly awaited
- Add timeout to long-running tests

### Test Timeout
```typescript
it("slow test", async () => {
  // test code
}, 10000); // 10 second timeout
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Next Steps

1. Run tests with `npm run test` to verify setup
2. Check coverage with `npm run test -- --coverage`
3. Fix any failing tests
4. Add more tests for new components as you build
5. Aim for 50%+ coverage for production readiness

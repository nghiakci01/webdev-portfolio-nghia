# Portfolio Website - Nguyễn Tuấn Nghĩa

## Giới thiệu

Website portfolio cá nhân của Nguyễn Tuấn Nghĩa - một nhà phát triển web chuyên nghiệp. Dự án này được xây dựng bằng React, TypeScript và Tailwind CSS để tạo ra trải nghiệm người dùng hiện đại và tối ưu.

## Tính năng

- **Trang chủ**: Giới thiệu cá nhân với avatar và thông tin cơ bản
- **Giới thiệu**: Thông tin chi tiết về bản thân
- **Kỹ năng**: Hiển thị các kỹ năng kỹ thuật với mức độ thành thạo
- **Dự án**: Bộ sưu tập các dự án đã thực hiện với mô tả và công nghệ sử dụng
- **Liên hệ**: Form liên hệ và thông tin liên lạc
- **Responsive**: Thiết kế tương thích với mọi thiết bị
- **Dark/Light mode**: Chuyển đổi chủ đề giao diện

## Công nghệ sử dụng

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, Shadcn/ui
- **Routing**: React Router DOM
- **State Management**: React Query
- **Forms**: React Hook Form với Zod validation
- **Icons**: Lucide React
- **Testing**: Vitest, Testing Library

## Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn

### Các bước cài đặt

```bash
# 1. Clone repository
git clone <YOUR_GIT_URL>

# 2. Di chuyển vào thư mục dự án
cd webdev-portfolio-nghia

# 3. Cài đặt dependencies
npm install

# 4. Chạy server phát triển
npm run dev
```

### Các lệnh khác

```bash
# Build cho production
npm run build

# Preview build
npm run preview

# Chạy tests
npm run test

# Lint code
npm run lint
```

## Triển khai

Dự án có thể được triển khai trên các nền tảng hosting tĩnh như:
- Vercel
- Netlify
- GitHub Pages

Để triển khai tự động, kết nối repository với nền tảng hosting và cấu hình build command là `npm run build`.

## Cấu trúc dự án

```
src/
├── components/          # Các component UI
│   ├── ui/             # Component cơ sở từ shadcn/ui
│   ├── Hero.tsx        # Section trang chủ
│   ├── About.tsx       # Section giới thiệu
│   ├── Skills.tsx      # Section kỹ năng
│   ├── Projects.tsx    # Section dự án
│   ├── Contact.tsx     # Section liên hệ
│   └── Footer.tsx      # Footer
├── pages/              # Các trang
├── hooks/              # Custom hooks
├── lib/                # Utilities
└── assets/             # Hình ảnh và tài nguyên
```

## Liên hệ

**Nguyễn Tuấn Nghĩa**
- Email: [your-email@example.com]
- LinkedIn: [your-linkedin]
- GitHub: [your-github]

## Giấy phép

Dự án này được phân phối dưới giấy phép MIT.

# Performance Optimization Guide

This guide covers all performance optimizations implemented in Phase 3 and best practices for maintaining high performance.

## Table of Contents
1. [Bundle Size Optimization](#bundle-size-optimization)
2. [Image Optimization](#image-optimization)
3. [Code Splitting](#code-splitting)
4. [Runtime Performance](#runtime-performance)
5. [Monitoring Performance](#monitoring-performance)
6. [Best Practices](#best-practices)

## Bundle Size Optimization

### Current Configuration
The project is configured to minimize bundle size through:
- **Code splitting**: Separate chunks for vendor, UI, and utilities
- **Asset inlining**: Files < 4KB embedded to reduce HTTP requests
- **Tree shaking**: Unused code automatically removed
- **Minification**: Terser compression in production

### Checking Bundle Size
```bash
# Build and analyze bundle
npm run build

# Check build output
ls -lh dist/
```

Expected output structure:
```
dist/
├── index.html
├── assets/
│   ├── vendor-xxxxx.js      # React, React Router, etc.
│   ├── ui-xxxxx.js          # Radix UI, lucide-react
│   ├── utils-xxxxx.js       # Libraries like Sonner, React Query
│   ├── app-xxxxx.js         # Application code
│   └── index-xxxxx.css      # Styles
```

### Monitoring Bundle Size
Track bundle size in CI/CD or manually:
```bash
# Install bundlesize if needed
npm install -D bundlesize

# Check bundle size
bundlesize
```

## Image Optimization

### Vite Image Query Parameters
Vite provides built-in image optimization without additional plugins:

#### 1. Responsive Images (Resizing)
```tsx
import img from './photo.png?w=480'

// Creates a resized version of the image
<img src={img} alt="Responsive photo" />
```

Available widths: 16, 32, 64, 128, 256, 512, 1024, 1920, 2560

#### 2. WebP Format (Modern & Compressed)
```tsx
import img from './photo.png?format=webp'

// Modern format, ~30% smaller than PNG
<img src={img} alt="WebP photo" />
```

#### 3. AVIF Format (Next-Gen)
```tsx
import img from './photo.png?format=avif'

// AVIF format, ~50% smaller than WebP
// Browser support: Chrome 85+, Edge 85+, Firefox 93+
<img src={img} alt="AVIF photo" />
```

#### 4. Picture Element (Progressive Enhancement)
```tsx
import original from './photo.png'
import webp from './photo.png?format=webp'
import avif from './photo.png?format=avif'

<picture>
  <source srcSet={avif} type="image/avif" />
  <source srcSet={webp} type="image/webp" />
  <img src={original} alt="Photo" />
</picture>
```

#### 5. Raw Content Import
```tsx
import imgData from './photo.png?raw'

// Get raw image data, useful for processing
console.log(imgData) // SVG text content
```

### Best Practices for Images

1. **Use Appropriate Sizes**
   - Desktop: 1920px or full width
   - Mobile: 480-768px
   - Use `srcSet` for multiple resolutions

2. **Format Selection**
   - PNG: Lossless, use for logos/graphics
   - JPEG: Lossy, use for photos
   - WebP: Better compression, modern browsers
   - AVIF: Best compression, newest browsers

3. **Lazy Loading**
   - Use `loading="lazy"` attribute (native support)
   - Implement with Intersection Observer for critical images

   ```tsx
   <img 
     src={img} 
     alt="Photo" 
     loading="lazy"
   />
   ```

## Code Splitting

### Current Setup
Four main chunks created automatically:

1. **vendor-xxxxx.js** (~150-200KB)
   - react, react-dom
   - react-router-dom
   - react-hook-form
   - @hookform/resolvers
   - zod

2. **ui-xxxxx.js** (~50-100KB)
   - @radix-ui components
   - lucide-react

3. **utils-xxxxx.js** (~30-50KB)
   - sonner
   - @tanstack/react-query
   - next-themes

4. **app-xxxxx.js** (~20-40KB)
   - Application-specific code

### Route-Based Code Splitting
For larger projects, implement route-based splitting:

```tsx
import { lazy, Suspense } from 'react'
import { Loader } from '@/components/Loader'

// Lazy load heavy components
const ContactSection = lazy(() => import('./sections/Contact'))
const ProjectsSection = lazy(() => import('./sections/Projects'))

function App() {
  return (
    <Suspense fallback={<Loader fullScreen text="Loading..." />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
    </Suspense>
  )
}
```

### Analyzing Chunks
```bash
npm install -D vite-plugin-visualizer

# After build, check dist/stats.html
```

## Runtime Performance

### Component Optimization

1. **Memoization (for expensive components)**
   ```tsx
   import { memo } from 'react'

   const HeavyComponent = memo(({ data }) => {
     return <div>{data}</div>
   })
   ```

2. **Lazy Loading Components**
   ```tsx
   const HeavyList = lazy(() => import('./HeavyList'))
   
   <Suspense fallback={<Loader />}>
     <HeavyList />
   </Suspense>
   ```

3. **Error Handling**
   - App wrapped in ErrorBoundary (prevents crashes)
   - Graceful error recovery
   - User-friendly fallback UI

4. **Loading States**
   - Use Loader component for async operations
   - Provides visual feedback
   - Improves perceived performance

### Form Performance
Current Contact form is optimized with:
- React Hook Form (minimal re-renders)
- Zod validation (efficient schema validation)
- Debounced inputs (if implemented)

## Monitoring Performance

### Lighthouse Audit
Google's Lighthouse is built into Chrome DevTools:

1. **In Chrome DevTools**:
   - F12 → Lighthouse tab
   - Click "Analyze page load"
   - Check Performance, Accessibility, Best Practices

2. **From Command Line**:
   ```bash
   npm install -g lighthouse
   lighthouse http://localhost:8080
   ```

3. **CI/CD Integration**:
   ```bash
   # In package.json scripts
   "audit": "lighthouse http://localhost:8080 --output-path=./lighthouse-report.html --only-categories=performance"
   ```

### Web Vitals
Monitor Core Web Vitals:

```tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)   // Cumulative Layout Shift
getFID(console.log)   // First Input Delay
getFCP(console.log)   // First Contentful Paint
getLCP(console.log)   // Largest Contentful Paint
getTTFB(console.log)  // Time to First Byte
```

### Performance Targets
Aim for these Web Vitals:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Best Practices

### Development
- ✅ Use React DevTools Profiler
- ✅ Monitor Performance tab in DevTools
- ✅ Check Network requests
- ✅ Use ErrorBoundary for error handling
- ✅ Test on low-end devices/slow networks

### Production
- ✅ Enable compression (gzip/brotli)
- ✅ Use CDN for static assets
- ✅ Set proper cache headers
- ✅ Monitor errors with Sentry or similar
- ✅ Regular Lighthouse audits
- ✅ Use performance budgets

### Images
- ✅ Always specify width/height (prevents layout shift)
- ✅ Use srcset for responsive images
- ✅ Lazy load off-screen images
- ✅ Use modern formats (WebP, AVIF)
- ✅ Optimize before deployment

### JavaScript
- ✅ Keep initial bundle small
- ✅ Code split by routes
- ✅ Tree shake unused code
- ✅ Minimize dependencies
- ✅ Lazy load heavy libraries

### CSS
- ✅ Use CSS-in-JS or utility CSS (Tailwind)
- ✅ Remove unused styles
- ✅ Minimize critical CSS
- ✅ Defer non-critical CSS

## Implementation Checklist

- [x] Code splitting configured
- [x] Image optimization available
- [x] Bundle minification enabled
- [x] Asset inlining configured
- [x] ErrorBoundary implemented
- [x] Loader component available
- [ ] Lighthouse audit target: 90+
- [ ] Web Vitals monitoring setup
- [ ] Performance budget defined
- [ ] CI/CD performance checks

## Resources

- [Vite Performance Guide](https://vitejs.dev/guide/features.html#glob-import)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Lighthouse Scoring Guide](https://developers.google.com/web/tools/lighthouse/scoring)
- [React Performance](https://react.dev/reference/react/memo)
- [Tailwind CSS Performance](https://tailwindcss.com/docs/optimizing-for-production)

## Next Steps

1. Run Lighthouse audit
2. Identify performance bottlenecks
3. Implement fixes from recommendations
4. Monitor with Web Vitals
5. Set up performance budgets

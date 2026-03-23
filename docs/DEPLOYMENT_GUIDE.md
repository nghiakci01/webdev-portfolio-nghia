# Deployment Guide

Complete guide to deploying the portfolio website to production.

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Configuration](#environment-configuration)
3. [Production Build](#production-build)
4. [Deployment Options](#deployment-options)
5. [Post-Deployment Setup](#post-deployment-setup)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying to production, verify the following:

### Code Quality
- [x] All tests passing: `npm run test`
- [x] No TypeScript errors: `npm run type-check`
- [x] No ESLint warnings: `npm run lint`
- [x] No console errors in development build
- [x] All components working as expected

### Performance
- [x] Bundle size optimized (< 500KB gzipped)
- [x] Images optimized
- [x] Code splitting configured
- [x] No console errors or warnings
- [x] Performance targets met (Lighthouse > 90)

### Functionality
- [x] All links working correctly
- [x] Forms validating and submitting properly
- [x] Theme toggle working
- [x] Navigation smooth and responsive
- [x] Mobile responsiveness verified

### Security
- [x] No sensitive data in version control
- [x] Environment variables properly configured
- [x] HTTPS enforced on production domain
- [x] Security headers configured
- [x] Dependencies up to date

---

## Environment Configuration

### Local Development Setup

1. **Create `.env.local` from template**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure Environment Variables**
   
   Edit `.env.local` and set:
   ```env
   NODE_ENV=development
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   VITE_SITE_URL=http://localhost:8080
   ```

### Production Setup

1. **Create `.env.production` (or set via hosting provider)**
   
   ```env
   NODE_ENV=production
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   VITE_SITE_URL=https://yourportfolio.com
   ```

2. **Verify Environment Variables**
   
   Check that all required variables are set:
   ```bash
   npm run env:validate
   ```

### Important Notes

- ⚠️ **Never** commit `.env.local` or `.env.production` to git
- ✅ Only `.env.example` should be in version control
- ✅ Use hosting provider's environment variable interface to set production variables
- ✅ Keep API keys and secrets secure

---

## Production Build

### Build Process

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Tests**
   ```bash
   npm run test
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

   This creates optimized files in `dist/` folder:
   - `index.html` - Main entry point
   - `assets/` - Bundled JavaScript, CSS, images
   - `robots.txt` - Search engine instructions
   - `_redirects` - URL routing rules (for Netlify)

4. **Verify Build Output**
   ```bash
   npm run preview
   ```
   
   Opens production build locally at `http://localhost:4173`

### Build Output Structure

```
dist/
├── index.html              # Main HTML file
├── robots.txt              # SEO configuration
├── _redirects              # Hosting configuration (Netlify)
└── assets/
    ├── app-xxxxx.js        # Application code
    ├── vendor-xxxxx.js     # React and dependencies
    ├── ui-xxxxx.js         # UI components library
    ├── utils-xxxxx.js      # Utilities and libraries
    ├── index-xxxxx.css     # Styles
    └── images/             # Optimized images
```

### Build Optimization Checklist

- [x] Code minified with Terser
- [x] Code splitting enabled (4 chunks)
- [x] Assets inlined if < 4KB
- [x] Tree shaking removes unused code
- [x] Images optimized
- [x] Source maps for debugging

---

## Deployment Options

### Option 1: Netlify (Recommended for Beginners)

**Easiest deployment with automatic builds.**

1. **Connect Repository**
   ```bash
   npm install -g netlify-cli
   netlify init
   ```

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Set Environment Variables**
   - Go to Netlify Dashboard
   - Site settings → Build & deploy → Environment
   - Add all variables from `.env.example`

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

**Benefits**:
- ✅ Automatic deployments on git push
- ✅ Free SSL/HTTPS certificate
- ✅ CDN included
- ✅ Easy rollbacks
- ✅ Great for portfolios

### Option 2: Vercel

**Optimized for React applications.**

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables**
   - Project Settings → Environment Variables
   - Add all variables from `.env.example`

4. **Deploy**
   - Push to main branch → automatic deployment

**Benefits**:
- ✅ Optimized for React/Vite
- ✅ Automatic preview deployments
- ✅ Great performance
- ✅ Easy analytics integration

### Option 3: GitHub Pages

**Free hosting but with limitations.**

1. **Update `vite.config.ts`**
   ```typescript
   export default defineConfig({
     base: '/repository-name/', // If deploying to subdirectory
     // ... rest of config
   });
   ```

2. **Create GitHub Actions Workflow**
   - Create `.github/workflows/deploy.yml`
   - Configure to build and deploy to gh-pages

3. **Enable GitHub Pages**
   - Repository Settings → Pages
   - Set source to `gh-pages` branch

**Benefits**:
- ✅ Free hosting
- ✅ Uses GitHub repositories
- ⚠️ Limited features for SPA routing

### Option 4: Traditional Hosting (Shared/VPS)

**More control but requires manual setup.**

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder**
   - Use FTP or SSH
   - Upload entire `dist/` contents to public folder

3. **Configure Server**
   - Set up SPA routing (all routes → index.html)
   - Enable GZIP compression
   - Set cache headers

4. **Example: Apache `.htaccess`**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## Post-Deployment Setup

### 1. Google Analytics Configuration

1. **Get Google Analytics ID**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create new property for your domain
   - Get tracking ID (format: G-XXXXXXXXXX)

2. **Set Environment Variable**
   ```env
   VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

3. **Verify Tracking**
   - Visit deployed site
   - Open Google Analytics → Realtime
   - Should see active users on page

### 2. EmailJS Configuration (Optional)

1. **Sign up at [EmailJS](https://www.emailjs.com)**

2. **Get Credentials**
   - Service ID
   - Template ID
   - Public Key

3. **Set Environment Variables**
   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
   VITE_EMAILJS_PUBLIC_KEY=public_xxxxx
   ```

4. **Test Contact Form**
   - Submit test message
   - Verify email received

### 3. Domain Setup

1. **Purchase Domain** (if not already done)
   - Recommended registrars: Namecheap, GoDaddy, Google Domains

2. **Point to Deployment**
   - Get nameservers or A records from hosting provider
   - Update domain DNS settings

3. **Enable HTTPS**
   - Most providers auto-generate SSL certificates
   - Verify "Secure" padlock in browser

### 4. Robots.txt & SEO

The project includes `robots.txt` for search engine crawling:

```text
User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://yourportfolio.com/sitemap.xml
```

Customize as needed for your site.

### 5. Custom Domain Configuration

Update environment variables:
```env
VITE_SITE_URL=https://yourportfolio.com
```

Used for:
- Open Graph meta tags
- Canonical URLs
- Email links

---

## Monitoring & Maintenance

### Performance Monitoring

1. **Lighthouse Audit**
   ```bash
   lighthouse https://yourportfolio.com
   ```
   
   Target scores: 90+

2. **Web Vitals Monitoring**
   - Set up with Google Analytics
   - Monitor LCP, FID, CLS

3. **Bundle Size Tracking**
   - Run `npm run build` regularly
   - Check if bundle size increases

### Error Tracking

1. **Set Up Sentry (Optional)**
   - Create account at [sentry.io](https://sentry.io)
   - Add Sentry SDK to project
   - Monitor production errors

2. **Check Application Logs**
   - Browser console for client errors
   - Server logs for deployment issues

### Regular Maintenance

**Weekly**:
- [ ] Check error logs
- [ ] Verify forms are working
- [ ] Test links and navigation

**Monthly**:
- [ ] Run Lighthouse audit
- [ ] Check security updates
- [ ] Review analytics data
- [ ] Update dependencies (minor)

**Quarterly**:
- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Update major dependencies
- [ ] Backup important data

---

## Troubleshooting

### Common Deployment Issues

#### 1. Build Fails
**Error**: `npm run build` fails with TypeScript or webpack errors

**Solutions**:
```bash
# Clear cache
rm -rf node_modules dist
npm install

# Run type check
npm run type-check

# Check for errors
npm run lint

# Try build again
npm run build
```

#### 2. Blank Page After Deployment
**Cause**: Incorrect base path or routing issues

**Solutions**:
- Verify base path in `vite.config.ts`
- Check routing configuration
- Verify all assets loaded (check Network tab)
- Ensure `_redirects` or `.htaccess` configured

#### 3. Environment Variables Not Working
**Cause**: Variables not accessible in app

**Solutions**:
```bash
# Variables must start with VITE_ to be exposed by Vite
# .env.local is ignored by git (good for security)
# Verify format: VITE_VARIABLE_NAME=value
```

#### 4. Slow Initial Load
**Cause**: Large bundle size

**Solutions**:
- Check bundle analysis
- Implement code splitting (already configured)
- Lazy load heavy components
- Compress images
- Enable CDN caching

#### 5. Form Submissions Not Working
**Cause**: EmailJS not configured or API key invalid

**Solutions**:
```bash
# Verify environment variables are set
# Test locally first
# Check EmailJS dashboard for errors
# Verify service/template/public IDs
```

#### 6. Analytics Not Tracking
**Cause**: Google Analytics ID not configured or script blocked

**Solutions**:
- Check `VITE_GOOGLE_ANALYTICS_ID` is set
- Verify script not blocked by ad blocker
- Check Google Analytics dashboard for traffic
- Ensure cookies allowed

---

## Deployment Checklist

Before going live:

- [ ] All tests passing
- [ ] No console errors
- [ ] Build completes successfully  
- [ ] Preview build works locally
- [ ] Environment variables configured
- [ ] Domain set up and pointing to host
- [ ] HTTPS enabled
- [ ] Google Analytics configured
- [ ] Contact form tested
- [ ] Mobile responsiveness verified
- [ ] Lighthouse audit passed (>90)
- [ ] Security headers configured
- [ ] Backups enabled
- [ ] Monitoring set up
- [ ] Maintenance plan documented

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build            # Production build
npm run preview          # Preview prod build locally

# Testing
npm run test             # Run tests
npm run test:ui          # Test UI
npm run test:coverage    # Coverage report

# Code Quality
npm run lint             # ESLint check
npm run type-check       # TypeScript check

# Deployment
npm run env:validate     # Validate environment
netlify init             # Netlify setup
netlify deploy --prod    # Deploy to Netlify
```

---

## Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Google Analytics Setup](https://support.google.com/analytics/)
- [Web Performance Guide](https://web.dev/performance/)

---

## Support & Questions

For deployment questions or issues:
1. Check the troubleshooting section above
2. Review relevant hosting provider documentation
3. Check application logs for errors
4. Verify all environment variables are set

**Happy deploying!** 🚀

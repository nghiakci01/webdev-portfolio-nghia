# Google Analytics Setup Guide

Complete guide to setting up and configuring Google Analytics for your portfolio website.

## Table of Contents
1. [Creating a Google Analytics Account](#creating-a-google-analytics-account)
2. [Getting Your Tracking ID](#getting-your-tracking-id)
3. [Configuring the Portfolio](#configuring-the-portfolio)
4. [Verifying Analytics Works](#verifying-analytics-works)
5. [Understanding Your Data](#understanding-your-data)
6. [Useful Reports](#useful-reports)
7. [Troubleshooting](#troubleshooting)

---

## Creating a Google Analytics Account

### Step 1: Go to Google Analytics

1. Visit [Google Analytics](https://analytics.google.com)
2. Click **"Start Measuring"** or **"Sign In"** if you have a Google account

### Step 2: Sign In with Google

- Use your Google account
- If you don't have one, create it

### Step 3: Create New Account

1. Click **"Create Account"** button
2. Fill in the form:
   - **Account Name**: Your name or "Portfolio Analytics"
   - **Website name**: Your portfolio domain
   - **Website URL**: `https://yourportfolio.com`
   - **Industry category**: Select relevant industry
   - **Reporting timezone**: Your timezone

3. Click **"Create"**

### Step 4: Accept Terms

- Read and accept Google Analytics Terms of Service
- Click **"I Accept"**

---

## Getting Your Tracking ID

### Step 1: Access Admin Panel

1. In Google Analytics, click the gear icon (⚙️) → **Admin**
2. Make sure you're in the right account and property

### Step 2: Find Your Tracking ID

**For Google Analytics 4 (GA4)** - Recommended

1. Go to **Admin** → **Property** → **Data Streams**
2. Click on your website's data stream
3. Look for **Measurement ID** (format: `G-XXXXXXXXXX`)
4. Copy this ID

**For Universal Analytics** (older version)

1. Go to **Admin** → **Property** → **Tracking Info**
2. Copy the **Tracking ID** (format: `UA-XXXXXXXXX`)

### Step 3: Copy Your ID

The ID should look like:
```
G-XXXXXXXXXX  (GA4 - Recommended)
or
UA-XXXXXXXXX  (Universal Analytics - Older)
```

---

## Configuring the Portfolio

### Step 1: Set Environment Variable

1. Open/Create `.env.local` file in project root

2. Add or update:
   ```env
   VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```
   
   Replace `G-XXXXXXXXXX` with your actual Measurement ID

### Step 2: For Production

Set the environment variable on your hosting provider:

**Netlify:**
- Site settings → Build & deploy → Environment
- Add key: `VITE_GOOGLE_ANALYTICS_ID`
- Add value: `G-XXXXXXXXXX`

**Vercel:**
- Project Settings → Environment Variables
- Add key: `VITE_GOOGLE_ANALYTICS_ID`
- Add value: `G-XXXXXXXXXX`

**Other Hosts:**
- Follow their documentation for setting environment variables

### Step 3: Verify Configuration

The portfolio will automatically:
- Load Google Analytics script when `VITE_GOOGLE_ANALYTICS_ID` is set
- Track all page views as users navigate
- Track contact form submissions
- Track any custom events defined in code

---

## Verifying Analytics Works

### Method 1: Realtime Monitoring

1. Visit your deployed portfolio
2. Go to Google Analytics → **Realtime**
3. You should see yourself as an active user

**Realtime shows:**
- ✅ Live visitor count
- ✅ Traffic source (direct, referrer, etc.)
- ✅ Current pages visited
- ✅ Geographic location

### Method 2: Check Browser Console

1. Open portfolio in browser
2. Press F12 (Developer Tools)
3. Go to **Console** tab
4. Look for message:
   ```
   Google Analytics initialized with ID: G-XXXXXXXXXX
   ```

✅ If you see this, analytics is loading  
❌ If not, check environment variable is set correctly

### Method 3: Check Network Tab

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Filter by "gtag" or "google"
4. Visit a page on your portfolio
5. Should see request to Google Analytics servers

---

## Understanding Your Data

### Key Metrics

**Users**
- Number of unique visitors to your site
- Tracked by browser cookies

**Sessions**
- Group of user interactions in a 30-minute period
- Resets after inactivity

**Page Views**
- Total number of pages viewed
- Same page viewed twice = 2 page views

**Bounce Rate**
- Percentage of sessions that viewed only 1 page
- Lower is better (means people explore more)

**Average Session Duration**
- How long visitors spend on average
- Longer is better (more engagement)

### Traffic Sources

**Organic Search**
- Google, Bing, Yahoo search results
- Free traffic from search engines

**Direct**
- User typed your URL or clicked a bookmark
- Shows brand recognition

**Referral**
- Came from another website's link
- Shows where visitors come from

**Social**
- Came from social media platform
- Shows social media effectiveness

---

## Useful Reports

### 1. Overview Report

**Location**: Home page after login

**Shows:**
- Total users in selected period
- Total sessions
- Average session duration
- Bounce rate
- Top pages

**Best for**: Quick health check of your site

### 2. Audience Report

**Location**: Audience → Overview

**Shows:**
- Who your visitors are
- Geographic location
- Device type (mobile, desktop, tablet)
- Browser and OS information
- New vs returning visitors

**Best for**: Understanding your audience

### 3. Acquisition Report

**Location**: Acquisition → Channels

**Shows:**
- Where traffic comes from
- Organic, direct, referral, social
- Performance of each channel

**Best for**: Understanding traffic sources

### 4. Behavior Report

**Location**: Behavior → Site Content

**Shows:**
- Most visited pages
- Page exit rates
- Time on page
- Which pages lose visitors

**Best for**: Finding your best content

### 5. Conversion Report

**Location**: Conversions (if goals set up)

**Shows:**
- Form submissions tracking
- Conversion rates
- User paths to completion

**Best for**: Measuring success actions

### 6. Events Report

**Location**: Events (in GA4)

**Shows:**
- Contact form submissions
- Link clicks
- Custom events
- Event count and details

**Best for**: Detailed user interaction analysis

---

## Setting Up Events (Advanced)

The portfolio tracks these events automatically:

**Contact Form Submission**
```
Event: form_submission
Details:
- form_name: "contact_form"
- success: true/false
- timestamp: submission time
```

**Page Views**
```
Tracked automatically when users navigate
```

### View Events in Google Analytics

1. Go to **Events** → **Event name**
2. Look for `form_submission` or other tracked events
3. See event count and properties

### Add Custom Events

You can add more event tracking in component code:

```tsx
import { trackEvent } from '@/lib/analytics'

// Track custom event
trackEvent('project_viewed', { project_name: 'My Portfolio' })

// Track link click
trackEvent('external_link_clicked', { url: 'https://example.com' })
```

---

## Troubleshooting

### Issue 1: No Data in Google Analytics

**Problem**: Set up tracking but no data shows in Google Analytics

**Possible Causes & Solutions**:

1. **Analytics not loaded**
   - Check browser console for error message
   - Verify `VITE_GOOGLE_ANALYTICS_ID` is set
   - Check environment variable format (G-XXXXXXXXXX)

2. **Ad blocker blocking analytics**
   - Disable ad blocker to test
   - Analytics may not track in some browsers

3. **Wrong Measurement ID**
   - Double-check ID in Google Analytics
   - Make sure it's GA4 (G-) not Universal Analytics (UA-)

4. **Wait for data to appear**
   - First data can take 24-48 hours
   - Check Realtime first (appears instantly)

### Issue 2: Realtime Shows Data But Reports Empty

**Solution**: 
- Wait 24-48 hours for data to process
- Google Analytics needs time to aggregate data
- Realtime is more immediate than regular reports

### Issue 3: Can't Find Measurement ID

**Solution**:
1. Go to Google Analytics
2. Click gear icon (⚙️) → **Admin**
3. Select your property
4. Under Property column, click **Data Streams**
5. Find your website data stream
6. Measurement ID is displayed

### Issue 4: Form Submissions Not Tracking

**Problem**: Form submits but no event in Google Analytics

**Solutions**:
```tsx
// Make sure form submission tracking is called
import { trackFormSubmission } from '@/lib/analytics'

const onSubmit = async (data) => {
  // ... submit logic ...
  trackFormSubmission('contact_form', true) // Track success
}
```

**Check in Analytics:**
1. Go to **Events** → **Event name**
2. Look for `form_submission` event
3. Check event count increases after form submission

### Issue 5: GDPR/Privacy Concerns

**Important**: 
- Users in EU/GDPR regions need consent before tracking
- Implement cookie consent banner for legal compliance
- Update privacy policy to mention analytics

---

## Privacy & Compliance

### GDPR Compliance

If your site targets EU users:

1. **Add Cookie Consent Banner**
   - Inform users about analytics tracking
   - Get consent before loading Google Analytics

2. **Update Privacy Policy**
   - Mention Google Analytics usage
   - Link to Google's privacy policy

3. **Use Google Consent Mode**
   - Prevents tracking until user consents
   - Still provides analytics insights

### Data Retention

Google Analytics data retention settings:

1. Go to **Admin** → **Data Settings** → **Data Retention**
2. Choose how long to keep user data
3. Recommended: 14 months for portfolio sites

---

## Best Practices

1. ✅ **Check Analytics Regularly**
   - Weekly checks for high traffic
   - Monthly deep dives into reports

2. ✅ **Set Goals/Events**
   - Track contact form submissions
   - Track project link clicks
   - Track important user actions

3. ✅ **Review Traffic Sources**
   - See where visitors come from
   - Optimize best-performing channels

4. ✅ **Monitor Performance**
   - Track page load times
   - Identify slow pages
   - Optimize user experience

5. ✅ **Use Segments**
   - Create segments for mobile vs desktop
   - Compare new vs returning visitors
   - Analyze specific user groups

---

## Resources

- [Google Analytics Documentation](https://support.google.com/analytics/)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/10089681)
- [Google Privacy Policy](https://policies.google.com/privacy)
- [GDPR Compliance Guide](https://support.google.com/analytics/answer/7576954)

---

## Next Steps

1. ✅ Set up Google Analytics account
2. ✅ Get your Measurement ID
3. ✅ Add to `.env.local` and production
4. ✅ Verify tracking works (Realtime)
5. ✅ Start analyzing your traffic
6. ✅ Make data-driven improvements

**Happy analyzing!** 📊

/**
 * Google Analytics Integration
 * Provides page view tracking and event logging
 */

import { googleAnalyticsConfig } from './env';

/**
 * Initialize Google Analytics
 * Add this to your main App component or during app initialization
 */
export function initializeGoogleAnalytics() {
  if (!googleAnalyticsConfig.isConfigured()) {
    return;
  }

  try {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsConfig.id}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', googleAnalyticsConfig.id, {
      page_path: window.location.pathname,
    });

    console.log('Google Analytics initialized with ID:', googleAnalyticsConfig.id);
  } catch (error) {
    console.error('Failed to initialize Google Analytics:', error);
  }
}

/**
 * Track page views
 * Call this in useEffect to track page changes
 */
export function trackPageView(pathname: string) {
  if (!googleAnalyticsConfig.isConfigured()) {
    return;
  }

  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', googleAnalyticsConfig.id, {
        page_path: pathname,
      });
    }
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

/**
 * Track custom events
 * Usage: trackEvent('contact_form', { action: 'submit', label: 'Contact Form' })
 */
export function trackEvent(eventName: string, eventParams?: Record<string, unknown>) {
  if (!googleAnalyticsConfig.isConfigured()) {
    return;
  }

  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

/**
 * Track form submissions
 */
export function trackFormSubmission(formName: string, success: boolean = true) {
  trackEvent('form_submission', {
    form_name: formName,
    success: success,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track errors
 */
export function trackError(errorName: string, errorMessage: string) {
  trackEvent('error', {
    error_name: errorName,
    error_message: errorMessage,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, label: string) {
  trackEvent('click', {
    event_category: 'external_link',
    event_label: label,
    value: url,
  });
}

/**
 * TypeScript declaration for gtag global
 * Add to window interface
 */
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}


export default {
  initializeGoogleAnalytics,
  trackPageView,
  trackEvent,
  trackFormSubmission,
  trackError,
  trackExternalLink,
};

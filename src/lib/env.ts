/**
 * Environment Variables Configuration
 * Type-safe access to environment variables
 * 
 * All VITE_ prefixed variables are automatically exposed by Vite
 */

/**
 * EmailJS Configuration
 */
export const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  
  // Check if EmailJS is configured
  isConfigured: () => {
    return Boolean(
      import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  },
};

/**
 * Google Analytics Configuration
 */
export const googleAnalyticsConfig = {
  id: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
  
  // Check if Google Analytics is configured
  isConfigured: () => {
    return Boolean(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
  },
};

/**
 * Application Configuration
 */
export const appConfig = {
  environment: import.meta.env.MODE || 'development',
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:8080',
  apiUrl: import.meta.env.VITE_API_URL || 'https://api.yoursite.com',
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
};

/**
 * Log environment configuration (development only)
 */
export function logEnvironmentConfig() {
  if (appConfig.isDevelopment) {
    console.log('=== Environment Configuration ===');
    console.log('Mode:', appConfig.environment);
    console.log('Site URL:', appConfig.siteUrl);
    console.log('EmailJS configured:', emailJsConfig.isConfigured());
    console.log('Google Analytics configured:', googleAnalyticsConfig.isConfigured());
    console.log('==================================');
  }
}

/**
 * Validate required environment variables
 */
export function validateEnvironmentVariables() {
  const errors: string[] = [];

  if (!appConfig.siteUrl) {
    errors.push('VITE_SITE_URL is not configured');
  }

  if (appConfig.isProduction) {
    // In production, warn if analytics is not configured
    if (!googleAnalyticsConfig.isConfigured()) {
      console.warn('Warning: Google Analytics is not configured for production');
    }
  }

  if (errors.length > 0) {
    console.error('Environment validation errors:', errors);
    return false;
  }

  return true;
}

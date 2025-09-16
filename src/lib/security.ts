// Security utilities and configurations

// Rate limiting configuration
export const RATE_LIMITS = {
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  },
  auth: {
    windowMs: 15 * 60 * 1000,
    max: 5, // Stricter limit for auth endpoints
  },
  contact: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit contact form submissions
  }
};

// Input sanitization
export function sanitizeInput(input: string): string {
  // Remove any HTML tags
  let sanitized = input.replace(/<[^>]*>?/gm, '');

  // Remove script tags and content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Escape special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  // Trim whitespace
  sanitized = sanitized.trim();

  // Limit length
  if (sanitized.length > 1000) {
    sanitized = sanitized.substring(0, 1000);
  }

  return sanitized;
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Phone validation (Nordic format)
export function validatePhone(phone: string): boolean {
  // Nordic phone numbers (Sweden, Norway, Denmark, Finland)
  const phoneRegex = /^(\+45|\+46|\+47|\+358|0045|0046|0047|00358)?[0-9]{8,10}$/;
  const cleaned = phone.replace(/\s|-/g, '');
  return phoneRegex.test(cleaned);
}

// URL validation
export function validateURL(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    // Only allow https in production
    if (process.env.NODE_ENV === 'production' && parsedUrl.protocol !== 'https:') {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Generate nonce for CSP
export function generateNonce(): string {
  const array = new Uint8Array(16);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  }
  return Buffer.from(array).toString('base64');
}

// Blocked countries/regions (if needed for compliance)
export const BLOCKED_REGIONS = [
  // Add any restricted jurisdictions here
  // 'US', // Example: if US is restricted
];

// IP validation
export function isValidIP(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){7}[0-9a-fA-F]{0,4}$/;

  if (ipv4Regex.test(ip)) {
    const parts = ip.split('.');
    return parts.every(part => {
      const num = parseInt(part, 10);
      return num >= 0 && num <= 255;
    });
  }

  return ipv6Regex.test(ip);
}

// Session timeout (30 minutes)
export const SESSION_TIMEOUT = 30 * 60 * 1000;

// Max file upload size (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed file types for uploads
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
];

// Security headers for API routes
export const API_SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};
/**
 * Storage configuration for the application
 *
 * Centralizes all localStorage keys and storage-related settings
 * to prevent key collisions and make storage management easier.
 */

/**
 * LocalStorage keys used by the application
 */
export const STORAGE_KEYS = {
  /** Key for storing dashboard state (widgets and settings) */
  DASHBOARD_STATE: 'dashboard-storage',
} as const;

/**
 * Storage version for handling migrations
 * Increment this when making breaking changes to stored data structure
 */
export const STORAGE_VERSION = 1;

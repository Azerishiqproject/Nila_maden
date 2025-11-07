import type { App } from 'firebase-admin/app';
import { initializeApp, applicationDefault, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let adminApp: App | null = null;

export function getAdminApp(): App | null {
  if (adminApp) return adminApp;

  try {
    if (getApps().length) {
      adminApp = getApps()[0]!;
      return adminApp;
    }

    // Prefer explicit service account if provided
    if (process.env.FIREBASE_ADMIN_PROJECT_ID && process.env.FIREBASE_ADMIN_CLIENT_EMAIL && process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
      adminApp = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
        }),
      });
      return adminApp;
    }

    // Fallback to application default credentials (e.g., GCP environment)
    adminApp = initializeApp({
      credential: applicationDefault(),
    });
    return adminApp;
  } catch {
    // Admin SDK not initialized
    return null;
  }
}

export function getAdminAuth() {
  const app = getAdminApp();
  if (!app) return null;
  try {
    return getAuth(app);
  } catch {
    return null;
  }
}



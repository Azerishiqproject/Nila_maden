import { NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/firebaseAdmin';
import { validateConfig } from '@/lib/config';

export async function GET() {
  try {
    // Önce Firebase config kontrolü yap
    const isFirebaseConfigured = validateConfig();
    
    if (!isFirebaseConfigured) {
      // Firebase config yoksa kullanıcı da yok demektir
      return NextResponse.json({ ok: true, hasUsers: false }, { status: 200 });
    }

    // Admin SDK ile kullanıcı kontrolü yap
    const adminAuth = getAdminAuth();
    if (!adminAuth) {
      // Admin SDK initialize edilemedi ama Firebase config var
      // Güvenlik için kullanıcı var kabul et (statik girişi engelle)
      return NextResponse.json({ ok: true, hasUsers: true, note: 'ADMIN_SDK_NOT_AVAILABLE' }, { status: 200 });
    }

    // List at most 1 user; if exists, we know there is at least one
    const list = await adminAuth.listUsers(1);
    const hasUsers = (list.users?.length || 0) > 0;
    return NextResponse.json({ ok: true, hasUsers }, { status: 200 });
  } catch  {
    // Hata durumunda Firebase config varsa güvenlik için kullanıcı var kabul et
    const isFirebaseConfigured = validateConfig();
    return NextResponse.json({ 
      ok: true, 
      hasUsers: isFirebaseConfigured, 
      error: 'LIST_USERS_FAILED',
      note: isFirebaseConfigured ? 'CONFIG_EXISTS_BLOCK_STATIC' : 'NO_CONFIG_ALLOW_STATIC'
    }, { status: 200 });
  }
}



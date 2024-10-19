import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const stmt = db.prepare(`
    SELECT c.id, c.name, c.description
    FROM companions c
    JOIN user_companions uc ON c.id = uc.companion_id
    WHERE uc.user_id = ?
  `);
  const companions = stmt.all(userId);

  return NextResponse.json(companions);
}

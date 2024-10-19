import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function POST(request) {
  const { userId, companionId } = await request.json();

  const stmt = db.prepare('INSERT INTO user_companions (user_id, companion_id) VALUES (?, ?)');
  const result = stmt.run(userId, companionId);

  return NextResponse.json({ affectedRows: result.changes });
}

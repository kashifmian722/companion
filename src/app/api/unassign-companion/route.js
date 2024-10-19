import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const companionId = searchParams.get('companionId');

  const stmt = db.prepare('DELETE FROM user_companions WHERE user_id = ? AND companion_id = ?');
  const result = stmt.run(userId, companionId);

  return NextResponse.json({ affectedRows: result.changes });
}

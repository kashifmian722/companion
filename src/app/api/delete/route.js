import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  if (type === 'companion') {
    const stmt = db.prepare('DELETE FROM companions WHERE id = ?');
    const result = stmt.run(id);
    return NextResponse.json({ affectedRows: result.changes });
  } else if (type === 'user') {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);
    return NextResponse.json({ affectedRows: result.changes });
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
}

import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  if (type === 'user') {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(id);
    return NextResponse.json(user);
  } else if (type === 'companion') {
    const stmt = db.prepare('SELECT * FROM companions WHERE id = ?');
    const companion = stmt.get(id);
    return NextResponse.json(companion);
  } else if (type === 'memory') {
    // Use existing Mem0 structure for memories
    // ... (keep existing code for memory retrieval)
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
}

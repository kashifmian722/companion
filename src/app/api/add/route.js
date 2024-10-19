import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function POST(request) {
  const { type, data } = await request.json();

  if (type === 'user') {
    const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
    const result = stmt.run(data.username, data.password, data.role);
    return NextResponse.json({ id: result.lastInsertRowid });
  } else if (type === 'companion') {
    const stmt = db.prepare('INSERT INTO companions (name, description) VALUES (?, ?)');
    const result = stmt.run(data.name, data.description);
    return NextResponse.json({ id: result.lastInsertRowid });
  } else if (type === 'memory') {
    // Use existing Mem0 structure for memories
    // ... (keep existing code for memory addition)
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
}

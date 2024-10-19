import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const { data } = await request.json();

  if (type === 'companion') {
    const stmt = db.prepare('UPDATE companions SET name = ?, description = ? WHERE id = ?');
    const result = stmt.run(data.name, data.description, id);
    return NextResponse.json({ affectedRows: result.changes });
  } else if (type === 'user') {
    const stmt = db.prepare('UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?');
    const result = stmt.run(data.username, data.password, data.role, id);
    return NextResponse.json({ affectedRows: result.changes });
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
}

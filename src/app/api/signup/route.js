import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function POST(request) {
  const { username, password, role } = await request.json();

  try {
    const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
    const result = stmt.run(username, password, role);
    return NextResponse.json({ success: true, userId: result.lastInsertRowid });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ success: false, message: 'Username already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Failed to create user' }, { status: 500 });
  }
}

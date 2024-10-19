import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function POST(request) {
  const { username, password } = await request.json();
  const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
  const user = stmt.get(username, password);

  if (user) {
    return NextResponse.json({ success: true, user });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }
}

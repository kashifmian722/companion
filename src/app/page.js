"use client";

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { SettingsPanel } from './settings-panel';
import { MemoriesPanel } from './memories-panel';
import Link from 'next/link';

export default function ChatbotUI() {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', password: '', role: 'user' });
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = async () => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    if (data.success) {
      setUser(data.user);
    }
  };

  const handleSignup = async () => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupData),
    });
    const data = await response.json();
    if (data.success) {
      // You might want to automatically log in the user after signup
      console.log('User created successfully');
      setShowSignup(false);
    } else {
      // Handle signup error, e.g., display an error message
      console.error('Failed to create user:', data.message);
    }
  };

  return (
    <div>
      {!user ? (
        <div>
          {showSignup ? (
            <div>
              <h2>Signup</h2>
              <Input
                value={signupData.username}
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                placeholder="Username"
              />
              <Input
                type="password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                placeholder="Password"
              />
              <select
                value={signupData.role}
                onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <Button onClick={handleSignup}>Signup</Button>
              <Button onClick={() => setShowSignup(false)}>Back to Login</Button>
            </div>
          ) : (
            <div>
              <h2>Login</h2>
              <Input
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                placeholder="Username"
              />
              <Input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="Password"
              />
              <Button onClick={handleLogin}>Login</Button>
              <Button onClick={() => setShowSignup(true)}>Signup</Button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>Welcome, {user.username}!</h1>
          <SettingsPanel isAdmin={user.role === 'admin'} />
          <MemoriesPanel userId={user.id} />
          <Link href={`/user/${user.id}`}>My Page</Link>
          {/* ... (existing chat UI components) */}
        </div>
      )}
    </div>
  );
}

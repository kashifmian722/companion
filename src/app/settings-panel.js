import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function SettingsPanel({ isAdmin }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
  const [companions, setCompanions] = useState([]);
  const [newCompanion, setNewCompanion] = useState({ name: '', description: '' });
  const [editingCompanion, setEditingCompanion] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchCompanions();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    const response = await fetch('/api/get?type=user');
    const data = await response.json();
    setUsers(data);
  };

  const handleAddUser = async () => {
    const response = await fetch('/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'user', data: newUser }),
    });
    if (response.ok) {
      fetchUsers();
      setNewUser({ username: '', password: '', role: 'user' });
    }
  };

  const fetchCompanions = async () => {
    const response = await fetch('/api/get?type=companion');
    const data = await response.json();
    setCompanions(data);
  };

  const handleAddCompanion = async () => {
    const response = await fetch('/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'companion', data: newCompanion }),
    });
    if (response.ok) {
      fetchCompanions();
      setNewCompanion({ name: '', description: '' });
    }
  };

  const handleEditCompanion = (companion) => {
    setEditingCompanion(companion);
  };

  const handleUpdateCompanion = async () => {
    const response = await fetch(`/api/update?type=companion&id=${editingCompanion.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: editingCompanion }),
    });
    if (response.ok) {
      fetchCompanions();
      setEditingCompanion(null);
    }
  };

  const handleDeleteCompanion = async (id) => {
    const response = await fetch(`/api/delete?type=companion&id=${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchCompanions();
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    const response = await fetch(`/api/update?type=user&id=${editingUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: editingUser }),
    });
    if (response.ok) {
      fetchUsers();
      setEditingUser(null);
    }
  };

  const handleDeleteUser = async (id) => {
    const response = await fetch(`/api/delete?type=user&id=${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchUsers();
    }
  };

  // ... (keep existing code for other settings)

  return (
    <div>
      {isAdmin && (
        <div>
          <h2>User Management</h2>
          {editingUser ? (
            <div>
              <h3>Edit User</h3>
              <Input
                value={editingUser.username}
                onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                placeholder="Username"
              />
              <Input
                type="password"
                value={editingUser.password}
                onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                placeholder="Password"
              />
              <select
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <Button onClick={handleUpdateUser}>Update User</Button>
              <Button onClick={() => setEditingUser(null)}>Cancel</Button>
            </div>
          ) : (
            <div>
              <Input
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                placeholder="Username"
              />
              <Input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Password"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <Button onClick={handleAddUser}>Add User</Button>
            </div>
          )}
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username} - {user.role}
                <Button onClick={() => handleEditUser(user)}>Edit</Button>
                <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
              </li>
            ))}
          </ul>

          <h2>Companion Management</h2>
          {/* ... (existing companion management UI) */}
        </div>
      )}
      {/* ... (keep existing settings UI) */}
    </div>
  );
}

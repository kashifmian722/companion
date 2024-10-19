import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export function SettingsPanel({ isAdmin }) {
  // ... (existing state variables)

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchCompanions();
    }
  }, [isAdmin]);

  // ... (existing functions)

  const handleAssignCompanion = async (userId, companionId) => {
    const response = await fetch('/api/assign-companion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, companionId }),
    });
    if (response.ok) {
      // You might want to update the UI to reflect the assignment
      console.log('Companion assigned successfully');
    }
  };

  const handleUnassignCompanion = async (userId, companionId) => {
    const response = await fetch(`/api/unassign-companion?userId=${userId}&companionId=${companionId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // You might want to update the UI to reflect the unassignment
      console.log('Companion unassigned successfully');
    }
  };

  return (
    <div>
      {isAdmin && (
        <div>
          <h2>User Management</h2>
          {/* ... (existing user management UI) */}

          <h2>Companion Management</h2>
          {/* ... (existing companion management UI) */}

          <h2>Companion Assignment</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <h3>{user.username}</h3>
                <ul>
                  {companions.map((companion) => (
                    <li key={companion.id}>
                      {companion.name}
                      <Button onClick={() => handleAssignCompanion(user.id, companion.id)}>
                        Assign
                      </Button>
                      <Button onClick={() => handleUnassignCompanion(user.id, companion.id)}>
                        Unassign
                      </Button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* ... (keep existing settings UI) */}
    </div>
  );
}

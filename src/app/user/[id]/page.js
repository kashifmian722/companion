"use client";

import { useState, useEffect } from 'react';

export default function UserPage({ params }) {
  const [user, setUser] = useState(null);
  const [companions, setCompanions] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/get?type=user&id=${params.id}`);
      const data = await response.json();
      setUser(data);
    };

    const fetchCompanions = async () => {
      const response = await fetch(`/api/get-user-companions?userId=${params.id}`);
      const data = await response.json();
      setCompanions(data);
    };

    fetchUser();
    fetchCompanions();
  }, [params.id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.username}'s Page</h1>
      <h2>Assigned Companions</h2>
      <ul>
        {companions.map((companion) => (
          <li key={companion.id}>{companion.name} - {companion.description}</li>
        ))}
      </ul>
    </div>
  );
}

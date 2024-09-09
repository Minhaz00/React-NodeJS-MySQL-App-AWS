import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const apiurl = process.env.REACT_APP_API_BASE_URL; // Changed to REACT_APP_API_BASE_URL for consistency with React best practices
    console.log('apiurl:', apiurl);
    fetchUsers(apiurl);
  }, []);

  const fetchUsers = async (apiurl) => {
    try {
      const response = await fetch(`${apiurl}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async () => {
    const apiurl = process.env.REACT_APP_API_BASE_URL; // Fetch the API URL here again
    try {
      await fetch(`${apiurl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      fetchUsers(apiurl);
      setNewUser({ username: '', email: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async () => {
    const apiurl = process.env.REACT_APP_API_BASE_URL; // Fetch the API URL here again
    try {
      await fetch(`${apiurl}/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      });
      fetchUsers(apiurl);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    const apiurl = process.env.REACT_APP_API_BASE_URL; // Fetch the API URL here again
    try {
      await fetch(`${apiurl}/users/${id}`, {
        method: 'DELETE',
      });
      fetchUsers(apiurl);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>

      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
            <button onClick={() => setSelectedUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="edit-container">
          <h2>Edit User</h2>
          <input
            type="text"
            value={selectedUser.username}
            onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
          />
          <input
            type="email"
            value={selectedUser.email}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
          />
          <br />
          <button onClick={handleUpdateUser}>Update User</button>
          {" "}
          <button onClick={() => setSelectedUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;

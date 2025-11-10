import React, { useEffect, useState } from "react";
import axios from "axios";
import './UserListPage.scss';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  axios.get("http://localhost:9999/api/admin/users")
    .then(res => {
      console.log(res.data); // kiểm tra dữ liệu
      setUsers(res.data.data || res.data); // fallback nếu data nằm ở root
    })
    .catch(err => console.error(err));
}, []);

  const handleBlock = async (id) => {
    try {
      await axios.put(`http://localhost:9999/api/admin/users/block/${id}`);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, blocked: true } : u));
    } catch (err) {
      console.error(err);
      alert("Block failed!");
    }
  };

  const handleUnblock = async (id) => {
    try {
      await axios.put(`http://localhost:9999/api/admin/users/unblock/${id}`);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, blocked: false } : u));
    } catch (err) {
      console.error(err);
      alert("Unblock failed!");
    }
  };

  const handleEdit = async (id) => {
    const newName = prompt("Enter new full name:");
    if (!newName) return;
    try {
      await axios.put(`http://localhost:9999/api/admin/users/edit/${id}`, { fullName: newName });
      setUsers(prev => prev.map(u => u._id === id ? { ...u, fullName: newName } : u));
    } catch (err) {
      console.error(err);
      alert("Edit failed!");
    }
  };

  return (
    <div className="user-list-page">
      <h1 className="page-title">Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.blocked ? "Blocked" : "Active"}</td>
              <td className="actions">
                {user.blocked ? 
                  <button onClick={() => handleUnblock(user._id)}>Unblock</button> :
                  <button onClick={() => handleBlock(user._id)}>Block</button>
                }
                <button onClick={() => handleEdit(user._id)} className="edit-btn">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;

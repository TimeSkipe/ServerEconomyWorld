import React, { useEffect, useState } from "react";
import '../styles/Account.css';
import { PORT } from "../connect/connect";
const Account = () => {
  const [users, setUsers] = useState([]);
  const userLevel = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${PORT}/user`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error retrieving users', error);
      }
    };

    fetchUsers();
  }, []);

  const levelUser = () => {
    if (userLevel.level === 'Admin') {
      if (users.length > 0) {
        return (
          <div>
            {users.map((user, index) => {
              if(user.level === 'Admin'){
                return(
                  <div className="TableInfoBar" key={user.id}>
                    <div className="NumberInfo">{index + 1}</div>
                    <div className="NameInfo">{user.firstname} {user.secondname}</div>
                    <div className="EmailInfo">{user.email}</div>
                    <div className="LevelInfo">{user.level}</div>
                    <div className="ButtonsInfo">
                    </div>
                  </div>
                )
              }
              else if(user.level === 'Moderator'){
                return(
                  <div className="TableInfoBar" key={user.id}>
                    <div className="NumberInfo">{index + 1}</div>
                    <div className="NameInfo">{user.firstname} {user.secondname}</div>
                    <div className="EmailInfo">{user.email}</div>
                    <div className="LevelInfo">{user.level}</div>
                    <div className="ButtonsInfo">
                      <div className="EditAccountButtonModerator" onClick={() => handleEditClick(user)}>Edit</div>
                      <div className="DeleteAccountButton" onClick={() => handleDelete(user._id)}>Delete</div>
                    </div>
                  </div>
                )
              }else{
                return(
                  <div className="TableInfoBar" key={user.id}>
                    <div className="NumberInfo">{index + 1}</div>
                    <div className="NameInfo">{user.firstname} {user.secondname}</div>
                    <div className="EmailInfo">{user.email}</div>
                    <div className="LevelInfo">{user.level}</div>
                    <div className="ButtonsInfo">
                      <div className="EditAccountButton" onClick={() => handleEditClick(user)}>Edit</div>
                      <div className="DeleteAccountButton" onClick={() => handleDelete(user._id)}>Delete</div>
                    </div>
                  </div>
                )
              }
              
            })}
          </div>
        );
      } else {
        return <p>No users found</p>;
      }
    } if (userLevel.level === 'Moderator') {
      if (users.length > 0) {
        return (
          <div>
            {users.map((user, index) => {
              if(user.level === 'Admin'){
                return(
                  <div className="TableInfoBar" key={user.id}>
                    <div className="NumberInfo">{index + 1}</div>
                    <div className="NameInfo">{user.firstname} {user.secondname}</div>
                    <div className="EmailInfo">{user.email}</div>
                    <div className="LevelInfo">{user.level}</div>
                    <div className="ButtonsInfo">
                    </div>
                  </div>
                )
              }
              else if(user.level === 'Moderator'){
                return(
                  <div className="TableInfoBar" key={user.id}>
                    <div className="NumberInfo">{index + 1}</div>
                    <div className="NameInfo">{user.firstname} {user.secondname}</div>
                    <div className="EmailInfo">{user.email}</div>
                    <div className="LevelInfo">{user.level}</div>
                    <div className="ButtonsInfo">
                    </div>
                  </div>
                )
              }else{
                return(
                  <div className="TableInfoBar" key={user.id}>
                    <div className="NumberInfo">{index + 1}</div>
                    <div className="NameInfo">{user.firstname} {user.secondname}</div>
                    <div className="EmailInfo">{user.email}</div>
                    <div className="LevelInfo">{user.level}</div>
                    <div className="ButtonsInfo">
                      <div className="EditAccountButton" onClick={() => handleEditClick(user)}>Edit</div>
                      <div className="DeleteAccountButton" onClick={() => handleDelete(user._id)}>Delete</div>
                    </div>
                  </div>
                )
              }
              
            })}
          </div>
        );
      } else {
        return <p>No users found</p>;
      }
    } else {
      return <p>User</p>;
    }
  };

  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newLevel, setNewLevel] = useState('');
  
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditMode(true);
  };
  const handleSendClick = async () => {
    try {
      const response = await fetch(`${PORT}/user/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level: newLevel }),
      });
      const data = await response.json();
      console.log(data); // Обробіть відповідь сервера за потреби
      setEditMode(false);
      setSelectedUser(null);
      setNewLevel('');
    } catch (error) {
      console.error('Помилка оновлення рівня користувача', error);
    }
  };
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Ви впевнені, що хочете видалити цей профіль?');
    if (confirmDelete) {
    try {
      await fetch(`${PORT}/user/${userId}`, {
        method: 'DELETE',
      });
  
      // Оновити список користувачів після видалення
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Помилка видалення користувача', error);
    }
  }
    try {
      
    } catch (error) {
      console.error('Помилка видалення користувача', error);
    }
  };
  
  const EditBar = () => {
    if (editMode && selectedUser) {
      return (
        <div className="EditBar">
          <div className="EditName">{selectedUser.email}</div>
          <form>
            <input type="text" placeholder="level" className="EditInput" value={newLevel} onChange={(e) => setNewLevel(e.target.value)} />
            <button className="EditButton" onClick={handleSendClick}>Send</button>
          </form>
        </div>
      );
    } else {
      return null;
    }
  };
  
  return (
    <div className="AccountListBar">
      <div className="TableListBar">
        <div className="NumberList">Номер</div>
        <div className="NameList">Ім'я</div>
        <div className="EmailList">Пошта</div>
        <div className="LevelList">Рівень</div>
        <div className="ButtonsList"></div>
      </div>
      
      {levelUser()}
      {EditBar()}
    </div>
  );
};

export default Account;

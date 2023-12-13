import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';

const Navbar = styled.nav`
  background-color: lightblue;
  height:65px;
  padding: 10px;
  color: black;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 35px 35px;
`;

const Title = styled.h1`
  margin: 20px;
`;

const Button = styled.button`
  background-color: #0a0a0a;
  color: white;
  padding: 12px;
  cursor: pointer;
  border-radius: 40px; 
  margin-right: 30px;
`;

const Loader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
  display: ${(props) => (props.loading ? 'block' : 'none')};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const UserCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px;
`;

const UserCard = styled.div`
  border: 2px solid #333;
  padding: 20px;
  border-radius: 10px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  }
`;

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar>
        <Title>LetsGrowMore Employee</Title>
        <Button onClick={getUsers}>Get Users</Button>
      </Navbar>
      <Loader loading={loading} />
      <UserCardGrid>
        {users.map((user) => (
          <UserCard key={user.id}>
            <img src={user.avatar} alt={user.first_name} />
            <h3>{`${user.first_name} ${user.last_name}`}</h3>
            <p>Email: {user.email}</p>
          </UserCard>
        ))}
      </UserCardGrid>
    </div>
  );
};

export default App;

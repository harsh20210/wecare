
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const backendURL = "https://pococare1.onrender.com/";
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", image: "" });
  const history = useNavigate();

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationTimeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        alert("Validation is taking longer than expected. Please retry.");
      }
    }, 6000);

    fetch(`${backendURL}admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    })
      .then(response => response.json())
      .then(data => {
        clearTimeout(validationTimeout);
        setIsLoading(false);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);
          localStorage.setItem("id", data.id);
          alert(data.message);
          history('/Admin');
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  // Handle registration
  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(`${backendURL}admin/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerForm),
    })
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        alert(`${data.message}. Login Now`);
        history('/Admin');
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <div>
      <nav>
        <div id="index">
          <h1 onClick={() => history('/')}>WeCare</h1>
        </div>
        <div>
          <h1>Admin Panel</h1>
        </div>
        <div>
          <button onClick={() => history('/signin')}>Login as User</button>
        </div>
      </nav>

      <div className="container">
        <div className="form adminLogin" style={{ display:"block" }}>
          <h2>Login as ADMIN</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="text"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>

        <div className="form admin" style={{ display:"block" }}>
          <h2>REGISTER as ADMIN</h2>
          <form onSubmit={handleRegister}>
            <label>Name</label>
            <input
              type="text"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
              required
            />
            <label>Email</label>
            <input
              type="text"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              required
            />
            <label>Image (URL)</label>
            <input
              type="text"
              value={registerForm.image}
              onChange={(e) => setRegisterForm({ ...registerForm, image: e.target.value })}
              required
            />
            <button type="submit">Signup</button>
          </form>
        </div>

        {isLoading && <div id="spinner">Loading...</div>}
      </div>
    </div>
  );
};

export default Admin;




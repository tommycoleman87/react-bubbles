import React, { useState } from "react";
import axios from 'axios';


const Login = (props) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const userHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({...user, [name]: value})
  }

  const login = () => {
    axios
      .post('http://localhost:5000/api/login', user)
      .then(res =>  {
        console.log(res)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles');
      })
      .catch(err => console.log(err))
  }

  return (
    <>
     <form onSubmit={(e) => {
       e.preventDefault()
       login();
     }}>
       <input type='text' name='username' onChange={(e) => userHandler(e)} value={user.username} placeholder='Username' />
       <input type='password' name='password' onChange={(e) => userHandler(e)} value={user.password} placeholder='Password' />
       <button>Login</button>
     </form>
    </>
  );
};

export default Login;

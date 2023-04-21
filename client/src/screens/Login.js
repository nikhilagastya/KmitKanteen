import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom'
import bg from "../bg.jpg";
export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json()
    console.log(json);
    if (json.Success) {

      localStorage.setItem('User', json);
      localStorage.setItem("Email",credentials.email);
     
      navigate("/");

    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div style={{backgroundImage: `url(${bg})`, height: '100vh', backgroundSize: 'cover' }}>
      <div>

        <Navbar />
      </div>
     
      <div className='container' style={{marginTop:"13%",marginLeft:"10%"}}>
        <form className='w-50 m-auto mt-5 border bg-white border-success rounded'  onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-dark">Email address</label>
            <input type="email" className="form-control bg-white" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-dark">Password</label>
            <input type="password" className="form-control bg-white" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/signup" className="m-3 mx-1 btn btn-warning">New User</Link>
        </form>

      </div>
    </div>
  )
}



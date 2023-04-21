import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import bg from "../bg.jpg";

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", rollNo:"", phno:"",email: "", password: "" })
  
  let navigate = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/create", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name,rollNo:credentials.rollNo,phno:credentials.phno, email: credentials.email, password: credentials.password,  })

    });
    const json = await response.json()
    console.log(json);
    if (json.Success) {
    
      localStorage.setItem('User', json)
      navigate("/login")
    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{backgroundImage: `url(${bg})`, height: '100vh', backgroundSize: 'cover'  }}>
      <div>
      <Navbar />
      </div>

        <div className='container text-dark' >
          <form className='w-50 m-auto mt-5 border bg-white border-success rounded' onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control bg-white" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="name" className="form-label">Roll No</label>
              <input type="text" className="form-control bg-white" name='rollNo' value={credentials.rollNo} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="name" className="form-label">Phone Number</label>
              <input type="text" className="form-control bg-white" name='phno' value={credentials.phno} onChange={onChange} aria-describedby="emailHelp" />
            </div>
        
            <div className="m-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control bg-white" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
           
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control bg-white" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/login" className="m-3 mx-1 btn btn-warning">Already a user</Link>
          </form>
        </div>
      </div>
  )
}
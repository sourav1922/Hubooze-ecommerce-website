import React, { useState } from 'react'
import './CSS/Loginsignup.css'
const Login_Singup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const login = async () => {
    console.log("Login Function Executed", formData)

    let responesData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accecpt: 'application/form-data',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((respone) => respone.json()).then((data) => responesData = data)

    if (responesData.success) {
      localStorage.setItem('auth-token', responesData.token);
      window.location.replace("/");
    }
    else{
      alert(responesData.error)
    }
  }

  const Signup = async () => {
    console.log("Signup Function Executed", formData)
    let responesData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accecpt: 'application/form-data',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((respone) => respone.json()).then((data) => responesData = data)

    if (responesData.success) {
      localStorage.setItem('auth-token', responesData.token);
      window.location.replace("/");
    }
    else{
      alert(responesData.error)
    }

  }

  const changeHandler = (e) => {
    {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  return (
    <div className='loginsingh'>
      <div className="loginsingup-continer">
        <h1>{state}</h1>
        <div className="loginsingup-felid">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} type='email' onChange={changeHandler} placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
        </div>
        <button onClick={() => { state === "Login" ? login() : Signup() }}>Continue</button>
        {state === "Sign Up" ?
          <p className='loginsingup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login  here</span></p> :
          <p className='loginsingup-login'>Create an account <span onClick={() => { setState("Sign Up") }}  >Sign Up here</span></p>
        }
        <div className="loginsingup-agree">
          <input type='checkbox' name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy.</p>
        </div>
      </div>
    </div>
  )
}

export default Login_Singup

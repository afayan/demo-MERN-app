import React, { useEffect, useRef, useState } from "react";
import gsap from 'gsap'
import { IoAlertCircle } from "react-icons/io5";

function Login() {
  const emailref = useRef();
  const password = useRef();
  const firstnameref = useRef()
  const email2ref = useRef()
  const password2ref = useRef()
  const repeatref = useRef()
  const [error, setError] = useState();
  const [success, setSuccess] = useState('')
  const [showLogin, setShowLogin] = useState(true)

  useEffect(() => {
    document.title = "Login";
  }, []);

  async function handleLogin() {



    if (!emailref.current.value || !password.current.value) {
      return setError("Please fill all fields");
    }

    const resp = await fetch("/api/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: emailref.current.value,
        password: password.current.value,
      }),
    });

    const data = await resp.json();

    setError('')
    setSuccess('')

    if (data.message && data.message === "success") {
      localStorage.setItem("auth", data.token);
      setSuccess('Login success, redirecting...')
      return;
    } else {
      setError(data.message);
    }
  }

  async function handleSignup() {


    if (!firstnameref.current.value || !email2ref.current.value || !password2ref.current.value || !repeatref.current.value) {
      return setError("Please Fill all fields")
    }

    if (password2ref.current.value !== repeatref.current.value) {
      return setError("Passwords do not match")
    }

    const resp = await fetch("/api/signup", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName : firstnameref.current.value,
        email: email2ref.current.value,
        password: password2ref.current.value,
      }),
    });
    const data = await resp.json()

    setError('')
    setSuccess('')

    if (data.message && data.message === 'success') {
      setSuccess('Account successfully created! Login to continue')
    }else{
      setError(data.message)
    }
  }

  function openLogin() {

    // gsap.to('.logindiv', {
    //   opacity: 0
    // })

    setSuccess('')
    setError('')
    setShowLogin(true)
    gsap.to('.smallscrollparent div', {
      x:"0%"
    })

    gsap.fromTo('.logindiv', {
      y: -10,
      opacity: 0
      
    }, {
      y : 0,
      opacity: 1
    })
  }

  function openSignup() {

    // gsap.to('.logindiv', {
    //   opacity: 0
    // })
    setError('')
    setSuccess('')
    setShowLogin(false)
    gsap.to('.smallscrollparent div', {
     
       x: '100%'
    })

    gsap.fromTo('.logindiv', {
      y: -10,
      opacity: 0
      
    }, {
      y : 0,
      opacity: 1
    })
  }

  return (
    <>
    <div className="loginpage">
    <img src="/image.jpg" alt="" className="lg"/>
   
    <div className="loginparent dark">
      <div className="select">
        <button onClick={openLogin}>Login</button> 
        <button onClick={openSignup}>signup</button>
        <div className="smallscrollparent">
          <div></div>
        </div>
      </div>

      <div className="logindiv">
       {showLogin && <div className="formbox">
          <h2>Login</h2>
          <input
            type="text"
            ref={emailref}
            className="forminput"
            placeholder="email"
          />
          <input
            type="password"
            ref={password}
            className="forminput"
            placeholder="password"
          />
          {error && <p className="error"><IoAlertCircle size={19}/>
            {error}</p>}
            {success && <p className="error success">
            {success}</p>}
          <button onClick={handleLogin}>Login</button>
        </div>}

       {!showLogin && <div className="formbox">
          <h2>Sign Up</h2>
          <input ref={firstnameref} type="text" className="forminput" placeholder="First Name" />
          <input ref={email2ref} type="text" className="forminput" placeholder="email" />
          <input ref={password2ref} type="password" className="forminput" placeholder="password" />
          <input
            ref={repeatref}
            type="password"
            className="forminput"
            placeholder="repeat password"
          />
          {error && <p className="error"><IoAlertCircle size={19}/> {error}</p>}
          {success && <p className="error success">
          {success}</p>}
          <button onClick={handleSignup}>Sign Up</button>
        </div>}
      </div>

      </div>
      </div>
    </>
  );
}

export default Login;

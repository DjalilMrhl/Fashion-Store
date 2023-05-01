import React, { useEffect } from "react";
import "./Auth.scss";
import { Close, PersonPinCircleRounded } from "@mui/icons-material";
import { AlertTitle, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser, uploadPhoto } from "../../Redux/Slices/authSlice";

function Auth({ authOpen, setAuthOpen }) {

  const [loginOn, setLoginOn] = useState(true);
  const authError = useSelector(state=> state.auth.authError)
  const id = useSelector(state=> state.auth.user.id)
  const [error, setError] = useState({
    identifier: "",
    email: "",
    password: "",
  })

  useEffect(() => {
    (authError && authError.toLocaleLowerCase().includes("password"))? setError({password: authError})
    :(authError && authError.toLocaleLowerCase().includes("identifier"))? setError({identifier: authError}): setError({email: authError})
  }, [authError])
  
  const dispatch = useDispatch()
  const [file, setFile] = useState("")
  const [photo, setPhoto] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  

  const handleFile = (e)=> {
    setFile(e.target.files[0])
  }
  useEffect(() => {
    if(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = ()=> {
          setPhoto(reader.result)
        }
    }
  }, [file, photo])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    e.target.reset();
    if (loginOn) {
        dispatch(loginUser(form))
        setAuthOpen(false)
    } else {
        if ((form.password === form.passwordConfirmation) && form.passwordConfirmation.length> 6 && form.password.length > 6) {
          if (form.name && form.email) {
            dispatch(registerUser(form))
              dispatch(uploadPhoto({id,photo}))
              setLoginOn(true)
          } else {
            !form.name? setError({identifier:"name is required"}): setError({email:"email is required"})
            setForm({
              name: "",
              email: "",
              password: "",
              passwordConfirmation: ""
            })
          }
        } else {
          setError({password:"password invalid"})
          setForm({
            name: "",
            email: "",
            password: "",
            passwordConfirmation: ""
          })
        }
    }
  }
  return (
    authOpen && (
      <aside className="auth">
        <Close onClick={() => {
          setAuthOpen(false)
          setFile("")
          setPhoto("")
          }}/>
        <span className="modal" onClick={() => {
          setAuthOpen(false)
          setFile("")
          setPhoto("")
          }}>
        </span>
        <form className="auth--container" onSubmit={handleSubmit}>
        {loginOn ? (<>
              <label className="photo">
                <PersonPinCircleRounded style={{cursor:"default"}}/>
              </label>
              <TextField
                label="Email or username"
                name="name"
                type="text"
                placeholder="email or username"
                onChange={handleChange}
              />
              <AlertTitle>{error.identifier}</AlertTitle>
              <TextField
                label="Password"
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
              />
              <AlertTitle>{error.password}</AlertTitle></>
          ) : (<>
              <label className="photo">
                {photo?<img src={photo} alt="" />:<PersonPinCircleRounded/>}
                Upload your photo
                <input type="file" accept="image/*" onChange={handleFile} hidden />
              </label>
              <TextField
                label="name"
                name="name"
                type="text"
                placeholder="Name"
                onChange={handleChange}
              />
              <AlertTitle>{error.identifier}</AlertTitle>
              <TextField
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <AlertTitle>{error.email}</AlertTitle>
              <TextField
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <AlertTitle>{error.password}</AlertTitle>
              <TextField
                label="Password Confirmation"
                name="passwordConfirmation"
                type="password"
                placeholder="Password Confirmation"
                onChange={handleChange}
              />
            </>
          )}
          <Button variant="" type="submit">{loginOn ? "Sign In" : "Sign Up"}</Button>
          <p>
            {loginOn ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => setLoginOn((prev) => !prev)}>
              {loginOn ? "Register" : "Login"}
            </span>
          </p>
        </form>
      </aside>
    )
  );
}

export default Auth;

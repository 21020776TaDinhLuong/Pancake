import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { login } from './actions/userActions'
import Message from './Message'


const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const {status: resetStatus} = useParams();


  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      window.location.href = redirect
    }
  }, [userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  useEffect(() => {
    if (resetStatus != "") {
      setMessage(resetStatus);
    }
  }, [resetStatus]);


  return (
    <>
      <div class="form-container">

        <form action="" method="post" onSubmit={submitHandler}>
          <h3>Log In</h3>
          {error && <Message variant='danger'>{error}</Message>}
          {message && <Message variant='success'>{message}</Message>}

          <input type="text" name="email" required placeholder="enter email" class="box" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" name="password" required placeholder="enter password" class="box" onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" name="submit" class="btn" value="login now" />
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </form>

      </div>
    </>
  )
}

export default Login
import React from 'react'
import {Link} from 'react-router-dom'
import LoginForm from '../Forms/LoginForm';

const Login = () => {
  return (
    <main className='splash'>
        <LoginForm />
        <Link to="/family">Welcome</Link>
    </main>

  )
}

export default Login
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../Components/Form Container/FormContainer'
import './login.css'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    if (email === '' || password === '') {
      alert('Please fill all the fields')
      return
    } else {
      try {
        const admin = await axios.post('https://2f3a-2405-201-3010-7be1-7c45-9302-ae72-e4b9.ngrok-free.app/admin/login', {
          username: email,
          password: password,
        })
        console.log(admin.data)
        window.localStorage.setItem('rid', admin.data)
        navigate('/admin')
      } catch (e) {
        alert('Invalid username or password')
      }
    }
  }

  return (
    <>
      <div className="project-bg">
        <div className="project-container">
          <h1 className="project-title">IRestaurant</h1>
          <FormContainer>
            <h1 className="signin-text">Sign In</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email" className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary" className="my-3">
                Sign In
              </Button>
            </Form>
          </FormContainer>
        </div>
      </div>
    </>
  )
}

export default Login

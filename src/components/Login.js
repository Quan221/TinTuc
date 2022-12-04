import React, { useState, useContext } from 'react'
import { Form, Button, Container, Col, Figure, } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../App'
import Apis, { endpoints, authApi } from '../configs/api.js'
import "../App.css"
import "../image/Loginscreen.jpg"



const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [user, dispatch] = useContext(UserContext)


    const login = async (evt) => {
        evt.preventDefault()


        const formData = new FormData()
        formData.append("password", password)
        formData.append("email", username)

        const res = await Apis.post(endpoints['login'], formData, {
            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }


        })
        console.log(res.data)

        localStorage.setItem('userToken', res.data['Access Token'])



        const user1 = await authApi().get(endpoints['current-user'])
        console.info(user1.data)
        dispatch({
            'type': 'login',
            'payload': user1.data
        })
        console.log(user)

    }


    if (user != null)
        return <Navigate to="/homepage" />
    return (
        <>

            <div className='bg_image' />
            <div className="sign-up-container form form-container">
                <Container >


                    <h1 className="text-center text-success">Đăng nhập</h1>
                    <Col >
                        <Form onSubmit={login}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text"
                                    value={username}
                                    onChange={(evt) => setUsername(evt.target.value)}
                                    placeholder="Tên đăng nhập"
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password"
                                    value={password}
                                    onChange={(evt) => setPassword(evt.target.value)}
                                    placeholder="Password" required />
                            </Form.Group>
                            <Button variant="success" type="submit" className="button ">
                                Đăng nhập
                            </Button>

                            <hr />
                            <Button variant="white" className="button ">
                                <Link to="/register" className='text-dark bold' variant="success" >Đăng ký tài khoản</Link>

                            </Button>


                        </Form>
                    </Col>
                </Container>
            </div>

        </>
    )
}
export default Login;
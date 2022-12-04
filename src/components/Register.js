import { useEffect, useRef, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import api, { endpoints } from "../configs/api";
import axios from "axios";

export default function Register() {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [name, setName] = useState(null)

    const nav = useNavigate()
    const goToLogin = () => {

        {
            nav(`/`)
        }

    }
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // axios.get('http://127.0.0.1:8000/categories')
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    useEffect(() => {

        const loadCategories = async () => {
            const res2 = await api.get(endpoints['category'])
            console.log(res2.data)

        }


        loadCategories()
    }, [])

    const register = (event) => {
        event.preventDefault()

        let registerUser = async () => {

            try {


                const res = await api.post(endpoints['register'], {
                    name: name,
                    email: username,
                    password: password
                }, {
                    headers: {

                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }


                })

                console.log(res.data)

                goToLogin()
            } catch (err) {
                console.log(err)

            }


        }

        if (password !== null && password === confirmPassword) {

            registerUser()

            // if (error) {
            //     alert('Failed!')
            // }
            // else {
            //     goToLogin()
            // }


        }

    }




    return (
        <Container>
            <h1 className="text-center text-success mt-5">Đăng ký người dùng</h1>
            <Form onSubmit={register}>
                <RegisterForm id="name" label="Name"
                    type="text" value={name}
                    change={(event) => setName(event.target.value)} name='name' bool='True' />
                <RegisterForm id="username" label="Username"
                    type="email" value={username}
                    change={(event) => setUsername(event.target.value)} name='username' />
                <RegisterForm id="password" label="Password"
                    type="password" value={password}
                    change={(event) => setPassword(event.target.value)} name='password' />
                <RegisterForm id="confirm" label="Confirm Password"
                    type="password" value={confirmPassword}
                    change={(event) => setConfirmPassword(event.target.value)} name='confirm password' />


                <Button variant="success" type="submit" style={{ marginLeft: '450px', marginBottom: '40px' }} >
                    Đăng ký
                </Button>

            </Form>
        </Container>
    )
}

function RegisterForm(props) {
    return (
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type}
                value={props.value}
                onChange={props.change}
                placeholder={props.name}
                required={props.bool}
            />
        </Form.Group>
    )
}
import { useEffect, useRef, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Apis, { endpoints } from "../configs/api";
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

    useEffect(() => {
        axios.get('locahost:8000/sanctum/csrf-cookie')
            .then(function (response) {
                console.log(response);
                console.log(document.cookie.get('XSRF-TOKEN'));

            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    axios.get('locahost:8000/categories')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    const register = (event) => {
        event.preventDefault()

        let registerUser = async () => {
            const data = {
                name: name,
                email: username,
                password: password
            }
            try {


                const res = await Apis.post(endpoints['register'], {
                    name: name,
                    email: username,
                    password: password
                }, {
                    headers: {
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
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
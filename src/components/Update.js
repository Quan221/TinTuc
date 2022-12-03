import React, { useEffect, useRef, useState } from "react";
import { Button, Container, FormSelect } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";
import api, { authApi, endpoints } from "../configs/api";
import Header from "./layout/Header";

const Update = () => {

    const { postId } = useParams()

    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [myPost, setMyPost] = useState([])

    useEffect(() => {


        const loadMyPost = async () => {
            const res = await authApi().get(endpoints['post-detail'](postId))
            console.log(res.data)
            setMyPost(res.data)
            setTitle(res.data['title'])

        }

        loadMyPost()
    }, [])
    const posts = (event) => {
        event.preventDefault()

        let post = async () => {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("content", content)
            console.log(category)
            try {
                await authApi().post(endpoints['post'], formData, {
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "multipart/formdata"
                    }

                })
                console.log(formData)


            } catch (err) {
                console.error(err)
            }

        }

        post()
    }

    return (

        <>
            <Header></Header>
            <Container>
                <Form onSubmit={posts}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" controlId='title'
                            value={title}
                            defaultValue={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={8} controlId='content'
                            value={content}
                            defaultValue={myPost.content}
                            onChange={(event) => setContent(event.target.value)} />
                    </Form.Group>





                    <Button variant="primary" type="submit" >
                        Đăng Bài
                    </Button>
                </Form>
            </Container>

        </>

    )


}

export default Update;
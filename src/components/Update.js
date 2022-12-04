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
                await authApi().post(`${endpoints['post']}${postId}`, formData, {
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
            <h3 class="mt-3 text-center text-primary text-uppercase">Chỉnh sửa bài viết</h3>
                <div class="col-12 col-xl-auto mb-3">
                    <a class="btn btn-sm btn-light text-primary" href="/my-post">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left me-1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Trở về Danh sách tin tức
                    </a>
                </div>
                <Form onSubmit={posts}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label >Tiêu đề<span class="text-danger">&#32;&#42;</span></Form.Label>
                        <Form.Control type="text" controlId='title'
                            value={title} autoFocus
                            defaultValue={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Nội dung tin tức<span class="text-danger">&#32;&#42;</span></Form.Label>

                        <Form.Control as="textarea" rows={8} controlId='content'
                            value={content}
                            defaultValue={myPost.content}
                            onChange={(event) => setContent(event.target.value)} />
                    </Form.Group>
                
                    <Button variant="primary" type="submit" >
                        Lưu thay đổi
                    </Button>
                </Form>
            </Container>

        </>

    )


}

export default Update;
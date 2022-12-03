import React, { useEffect, useRef, useState } from "react";
import { Button, Container, FormSelect } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import api, { authApi, endpoints } from "../configs/api";
import Header from "./layout/Header";

const Post = () => {



    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(null)
    const [myPost, setMyPost] = useState([])

    useEffect(() => {

        const loadPost = async () => {
            const res2 = await api.get(endpoints['category'])
            console.log(res2.data)
            setCategories(res2.data)

        }
        const loadMyPost = async () => {
            const res = await authApi().get(endpoints['my-post'])
            console.log(res.data)
            setMyPost(res.data)

        }

        loadMyPost()
        loadPost()
    }, [])
    const posts = (event) => {
        event.preventDefault()

        let post = async () => {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("content", content)
            formData.append("photo", photo)
            formData.append("category_id", category)
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
    console.log(categories)
    console.log(myPost.title)
    return (

        <>
            <Header></Header>
            <Container>
                <Form onSubmit={posts}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="title" controlId='title'
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={10} controlId='content'
                            value={content}
                            onChange={(event) => setContent(event.target.value)} />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="photo">
                        <Form.Label>Photo</Form.Label>
                        <Form.Control type="file" value={photo} className="form-control" onChange={(event) => setPhoto(event.target.files[0])} />
                    </Form.Group> */}

                    <input type='file' onChange={(event) => setPhoto(event.target.files[0])}  ></input>
                    <FormSelect value={category} onChange={(event) => setCategory(event.target.value)}  >
                        <option disabled selected='true' >Not select</option>
                        {categories.map(c => {
                            return <option value={c.id}>{c.name}</option>
                        })}


                    </FormSelect>
                    <Button variant="primary" type="submit" >
                        Đăng Bài
                    </Button>
                </Form>
            </Container>

        </>

    )


}
function PostForm(props) {
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
export default Post;
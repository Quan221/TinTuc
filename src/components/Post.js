import React, { useEffect, useRef, useState } from "react";
import { Button, Container, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
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
                <h3 class="mt-3 text-center text-primary text-uppercase">Tạo bài viết mới</h3>
                <div class="col-12 col-xl-auto mb-3">
                    <a class="btn btn-sm btn-light text-primary" href="/my-post">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left me-1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Trở về Danh sách tin tức
                    </a>
                </div>
                <Form onSubmit={posts}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label >Tiêu đề<span class="text-danger">&#32;&#42;</span></Form.Label>
                        <Form.Control type="text" autoFocus placeholder="Nhập tiêu đề..." controlId='title'
                            value={title} required
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Nội dung tin tức<span class="text-danger">&#32;&#42;</span></Form.Label>
                        <Form.Control as="textarea" rows={10} controlId='content'
                            value={content} placeholder="Nhập nội dung của tin tức..."
                            onChange={(event) => setContent(event.target.value)} />

                    </Form.Group>


                    {/* <Form.Group className="mb-3" controlId="photo">
                        <Form.Label>Photo</Form.Label>
                        <Form.Control type="file" value={photo} className="form-control" onChange={(event) => setPhoto(event.target.files[0])} />
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Hình ảnh</Form.Label>
                        {/* <Form.Control type="file" value={photo} className="form-control" onChange={(event) => setPhoto(event.target.files[0])} /> */}

                        <input type='file' class="form-control" onChange={(event) => setPhoto(event.target.files[0])}  ></input>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Danh mục tin tức</Form.Label>
                        <FormSelect value={category} onChange={(event) => setCategory(event.target.value)}  >
                            <option disabled selected='true' >Chọn danh mục</option>
                            {categories.map(c => {
                                return <option value={c.id}>{c.name}</option>
                            })}

                        </FormSelect>
                    </Form.Group>

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
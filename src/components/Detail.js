import React, { useState, useContext, useEffect } from 'react'
import { Form, Button, Container, Col, Figure, Image, } from 'react-bootstrap'
import { Link, Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../App'
import Apis, { endpoints, authApi } from '../configs/api.js'
import "../App.css"
import "../image/Loginscreen.jpg"
import api from '../configs/api.js'
import Header from './layout/Header'
import { BsHandThumbsUp } from 'react-icons/bs'
import { BiLike, BiWrench } from 'react-icons/bi'



const Detail = () => {
    const { postId } = useParams()
    const [postContent, setPostContent] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [users, setUsers] = useState([])
    const [user, dispatch] = useContext(UserContext)
    const [check, setCheck] = useState(null)
    const [likeNumber, setLikeNumber] = useState(null)
    const [comment, setComment] = useState(null)
    const [getComment, setGetComment] = useState([])
    const [contentComment, setContentComment] = useState(null)

    const loadIsLike = async () => {
        const res = await authApi().get(endpoints['check-like'](postId))
        setCheck(res.data.Status)
        console.log(check)

    }
    const loadLikeNumber = async () => {
        const res = await api.get(endpoints['get-like'](postId))
        console.log(res.data)
        setLikeNumber(res.data)
    }
    const loadComment = async () => {
        const res = await api.get(endpoints['get-comment'](postId))
        console.log(res.data)
        setGetComment(res.data)

    }
    useEffect(() => {
        const loadContentPost = async () => {
            const res = await api.get(endpoints['post-detail'](postId))
            console.log(res.data)
            setPostContent(res.data)
            setPhoto(res.data['photo'])
            setTitle(res.data['title'])
            setContent(res.data['content'])
            setUsers(res.data.user)
        }
        loadLikeNumber()
        loadContentPost()
        loadIsLike()
        loadComment()
    }, [])
    const like = async () => {


        let res = await authApi().post(((endpoints['like'])(postId)), {

        })
        setCheck(!check)
        loadIsLike()
        loadLikeNumber()
    }
    const addComment = async (event) => {
        event.preventDefault()
        let res = await authApi().post((endpoints['send-comment'])(postId), {
            'content': comment,
            'user_id': user.id
        })
    }
    let btn = <>


    </>
    let btn2 = <></>

    if (user != null) {
        btn2 = <>
            <div id="comment" class="row">
                <div id="avatar" class="col-auto"><img src="Núi_ (15).jpg" alt="" /></div>
                <div className="col-9">
                    <div id="role">Author</div>
                    <p id="name">{users.name}</p>
                    <Form style={{ display: 'flex', justifyContent: 'space-between' }} onSubmit={addComment}  >
                        <Form.Group className="mb-3" >
                            <Form.Label>Comment<span class="text-danger">&#32;&#42;</span></Form.Label>
                            <Form.Control type="text"
                                value={comment} placeholder="Nhập nội dung của tin tức..."
                                onChange={(event) => setComment(event.target.value)} style={{ width: '900px' }} />

                        </Form.Group>
                        <Button style={{ height: '50px', marginTop: "20px" }} type='submit' >send</Button>
                    </Form>

                </div>
            </div></>
        if (check == ' OK') {


            btn = <>
                <div style={{ display: 'flex' }} >
                    <Button onClick={like} ><BiWrench ></BiWrench></Button>
                    <h3 style={{ marginLeft: '10px' }} >{likeNumber}</h3>
                </div>
            </>
        }
        else {
            btn = <>
                <div style={{ display: 'flex' }} >
                    <Button onClick={like} ><BiLike ></BiLike></Button> <h3 style={{ marginLeft: '10px' }} >  {likeNumber}</h3>

                </div>
            </>

        }
    }
    return (
        <>



            <Header />
            <div style={{ height: '300px', background: '#0E1E32' }} >

            </div>
            <Image style={{ width: '800px', height: '300px', background: 'red', position: 'relative', left: '23%', top: '-150px' }} src={`http://localhost:8000/storage/${photo}`} />
            <Container>
                <div className='title-news'  >{title}</div>
                <div className='text-content'>{content}</div>

                {btn}
                <div id="comment" class="row">Tác Giả Sáng Tác </div>
                <hr className="line"></hr>

                <div id="comment" class="row">
                    <div id="avatar" class="col-auto"><img src="Núi_ (15).jpg" alt="" /></div>
                    <div className="col-9">
                        <div id="role">Tác Giả</div>
                        <p id="name">{users.name}</p>
                        <p id="about">Caroline Casey is an award-winning social activist and founder of The Valuable 500, a global movement aimed at getting 500 companies to commit to disability inclusion. </p>
                    </div>
                </div>
                <div id="comment" class="row">Comment </div>
                <hr className='line' ></hr>

                {getComment.map(c => {
                    return (
                        <>
                            <div id="comment" class="row">
                                <div id="avatar" class="col-auto"><img src="Núi_ (15).jpg" alt="" /></div>
                                <div className="col-9">
                                    <div id="role">Tác Giả</div>
                                    <p id="name">{c.id}</p>
                                    <p id="about" > {c.content}</p>
                                </div>
                            </div>

                        </>
                    )
                })}
                {btn2}




            </Container>


        </>
    )
}
export default Detail;
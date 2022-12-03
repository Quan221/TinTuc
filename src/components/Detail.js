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



const Detail = () => {
    const { postId } = useParams()
    const [postContent, setPostContent] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [users, setUsers] = useState([])


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
        loadContentPost()
    }, [])
    const like = async () => {


        let res = await authApi().post(((endpoints['like'])(postId)), {

        })
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
                <Button onClick={like} ><BsHandThumbsUp  ></BsHandThumbsUp></Button>

                <hr className="line"></hr>
                <div id="comment" class="row">
                    <div id="avatar" class="col-auto"><img src="Núi_ (15).jpg" alt="" /></div>
                    <div className="col-9">
                        <div id="role">Author</div>
                        <p id="name">{users.name}</p>
                        <p id="about">Caroline Casey is an award-winning social activist and founder of The Valuable 500, a global movement aimed at getting 500 companies to commit to disability inclusion. </p>
                    </div>
                </div>


            </Container>
            <div className="col-4 m-0 px-3 ">
                <div className="recommend">
                    <div style={{ margin: '5px' }} >
                        <div className="subtitle ">Recommended for you</div>
                        <div className="card " id="recommend ">
                            <img src="/Núi_ (15).jpg " class="card-img-top " alt="... " />
                            <div className="card-body ">
                                <h5 className="card-title ">Millions rely on emergency pandemic benefits for rent, food, and
                                    medicine. Now, that lifeline could disappear.</h5>
                            </div>
                        </div>
                    </div>
                    <div style={{ margin: '5px' }} >
                        <div className="subtitle ">Recommended for you</div>
                        <div className="card " id="recommend ">
                            <img src="/Núi_ (15).jpg " class="card-img-top " alt="... " />
                            <div className="card-body ">
                                <h5 className="card-title ">Millions rely on emergency pandemic benefits for rent, food, and
                                    medicine. Now, that lifeline could disappear.</h5>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}
export default Detail;
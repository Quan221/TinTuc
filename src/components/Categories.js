import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Header from "./layout/Header";
import Image from 'react-bootstrap/Image'
import test from './image 44.png';
import test2 from './image 46.png';
import test3 from './image 50.png';
import test4 from './image 47.png';
import Footer from "./layout/Footer";
import { UserContext } from "../App";
import api, { authApi, endpoints } from "../configs/api";
import { Link } from "react-router-dom";
const Categories = () => {
    const [user, dispatch] = useContext(UserContext)
    console.log(user)
    const [lists, setLists] = useState([])
    const [post, setPost] = useState([])
    useEffect(() => {

        const loadPost = async () => {
            const res2 = await api.get(endpoints['post'])

            setLists(res2.data)

            console.log(res2.data)

        }




        loadPost()


        // loadPost()
    }, [])
    console.log(lists.length - 1)
    return (
        <>
            <Header />
            <Container  >
                <div className="list-new"  >

                    {lists.map(c => {
                        if (c.id == lists.length) {
                            return (
                                <>

                                </>
                            )
                        }
                        else {
                            return (
                                <>
                                    <Link to={`/posts/detail/${c.id}`} className='nav-link' >
                                        <div className="item-new" >
                                            <Image src={`http://localhost:8000/storage/${c.photo}`} style={{
                                                width: '438px',
                                                height: '220px',
                                                position: 'relative',

                                            }} />
                                            <div className="title-news" > {c.title} </div>
                                            <div className="content-news" >{c.content}  </div>

                                        </div>
                                    </Link>
                                </>
                            )
                        }

                    })}


                </div>


            </Container>
            <Footer />
        </>
    )
}
export default Categories;
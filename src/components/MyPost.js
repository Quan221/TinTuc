import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authApi, endpoints } from "../configs/api";
import Header from "./layout/Header";


const MyPost = () => {
    const [post, setPost] = useState([])


    useEffect(() => {

        const loadMyPost = async () => {
            const res = await authApi().get(endpoints['my-post'])
            console.log(res.data)
            setPost(res.data)

        }

        loadMyPost()

    }, [])

    return (

        <>
            <Header />
            <Container>
                <Table bordered hover style={{

                    whiteSpace: 'nowrap',
                }} >
                    <thead>
                        <tr>
                            {/* <th style={{ textAlign: "center" }}  >sad </th> */}
                            <th >Tiêu đề</th>
                            <th >Nội dung</th>
                            <th>Chỉnh sửa nội dung</th>
                            <th>Xóa bài viết</th>
                        </tr>
                    </thead>
                    {
                        post.map(c => {
                            return (

                                <tbody  >

                                    <tr  >
                                        <td >{c.title}</td>
                                        <td style={{ overflow: 'hidden', whiteSpace: 'normal', height: '105px', display: 'inline-block', textOverflow: 'ellipsis' }}   > {c.content}  </td>

                                        <td><Link to={`/posts/update/${c.id}`} ><Button style={{ backgroundColor: '#4CAF50', borderRadius: '10px' }} > Chỉnh Sửa</Button></Link></td>
                                        <td><Button style={{ backgroundColor: '#4CAF50', borderRadius: '10px' }} > Xóa</Button></td>
                                    </tr>



                                </tbody>

                            )
                        })
                    }
                </Table>

            </Container>
        </>
    )
}
export default MyPost;
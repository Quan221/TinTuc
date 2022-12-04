import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from 'react-router-dom';
import { BsJustify, BsPersonFill } from "react-icons/bs";
import { Button, Image, Nav, NavDropdown } from "react-bootstrap";
import { UserContext } from "../../App";
import logo from "../../image/ou.png";
import api, { endpoints } from "../../configs/api";


const Header = () => {
    const [user, dispatch] = useContext(UserContext)
    const [category, setCategory] = useState([])
    const [lists, setLists] = useState([])
    const nav = useNavigate()
    const goToHome = (categoryId) => {
        {
            nav(`/categories/${categoryId}/posts`)
        }
    }
    let btn = <></>
    const logout = (evt) => {
        dispatch({ "type": "logout" })
        localStorage.clear()
    }
    const loadPost = async () => {
        const res2 = await api.get(endpoints['category'])
        console.log(res2.data)
        setCategory(res2.data)

    }

    const loadPost2 = async (categoryId) => {
        const res2 = await api.get(endpoints['categoies-posts'](categoryId))

        setLists(res2.data)



        console.log(res2.data)

    }
    useEffect(() => {





        loadPost()
    }, [])
    if (user != null) {
        if (user.role == 2) {

            btn = <>

                <NavDropdown title={user.name} id="basic-nav-dropdown" style={{ marginLeft: "5%", height: '100%', width: "100%" }}>
                    <NavDropdown.Item >
                        <Link to='/my-post' className="nav-link" > Bài Đăng Của Tôi</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                        <Link to='/post' className="nav-link"  > Viết Bài</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >
                        <Link onClick={logout} > Đăng xuất</Link>
                    </NavDropdown.Item>
                </NavDropdown>

            </>

        }
        else {
            btn = <>
                <NavDropdown title={user.name} id="basic-nav-dropdown" style={{ marginLeft: "5%", height: '100%', width: "100%" }}>
                    <NavDropdown.Item >
                        <Link to='/admin' className="nav-link" >Quản Lý Bài Viết</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item >
                        <Link onClick={logout} > Đăng xuất</Link>
                    </NavDropdown.Item>
                </NavDropdown>

            </>

        }

    }
    else {
        btn = <>
            <div style={{ marginTop: '8px' }} > </div>
            <Link to='/login' className='nav-link' style={{ width: '150px' }}  >Đăng Nhập</Link>

        </>

    }

    return (
        <>
            <div className="header" >

                <div className='content-header' >
                    <Image src={logo} className="logo-header" ></Image>
                    <Link to='/homepage' className="nav-link" >Trang Chủ</Link>

                    {category.map(c => {
                        return (
                            <Link className="nav-link" to={`/categories/${c.id}/posts`} >{c.name}</Link>
                        )
                    })}



                </div>
                <div className="icons-header" >
                    {btn}
                </div>
            </div>

        </>
    )
}
export default Header;
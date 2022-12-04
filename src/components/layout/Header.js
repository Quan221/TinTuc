import React, { useContext, useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import { BsJustify, BsPersonFill } from "react-icons/bs";
import { Image, NavDropdown } from "react-bootstrap";
import { UserContext } from "../../App";
import logo from "../../image/ou.png";
import api, { endpoints } from "../../configs/api";


const Header = () => {
    const [user, dispatch] = useContext(UserContext)
    const [categories, setCategories] = useState([])
    let btn = <></>
    const logout = (evt) => {
        dispatch({ "type": "logout" })
        localStorage.clear()
    }
    useEffect(() => {

        const loadPost = async () => {
            const res2 = await api.get(endpoints['category'])
            console.log(res2.data)
            setCategories(res2.data)

        }



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
                        <Link to='/login' onClick={logout} > Đăng xuất</Link>
                    </NavDropdown.Item>
                </NavDropdown>

            </>

        }
        // else {
        //     btn = <>
        //         <div style={{ marginTop: '8px' }} > </div>
        //         <Link to='/login'  >  Đăng xuất</Link>

        //     </>

        // }

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
                    {categories.map(c => {
                        return (
                            <Link className="nav-link" >{c.name}</Link>
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
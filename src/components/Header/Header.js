import React from "react";

import { Link } from 'react-router-dom';
import { BsJustify, BsPersonFill } from "react-icons/bs";


const Header = () => {


    return (
        <>
            <div className="header" >

                <div className='content-header' >
                    <div className="logo-header" ></div>
                    <Link to="/" className='nav-link' >Corona Update</Link>
                    <Link to='/' className='nav-link'>Politics</Link>
                    <Link className="nav-link">Sport</Link>

                </div>
                <div className="icons-header" ><BsPersonFill style={{ marginLeft: "5%", height: '100%', width: "100%" }} ></BsPersonFill> <BsJustify style={{ marginLeft: "5%", height: '100%', width: "100%" }} /> </div>

            </div>

        </>
    )
}
export default Header;
import React, { useContext } from "react";

import { Link } from 'react-router-dom';
import { BsJustify, BsPersonFill } from "react-icons/bs";
import { NavDropdown } from "react-bootstrap";
import { UserContext } from "../../App";


const Header = () => {
    const [user, dispatch] = useContext(UserContext)

    return (
        <>
            <div className="header" >

                <div className='content-header' >
                    <div className="logo-header" ></div>
                    <Link to="/" className='nav-link' >Corona Update</Link>
                    <Link to='/' className='nav-link'>Politics</Link>
                    <Link className="nav-link">Sport</Link>

                </div>
                <div className="icons-header" ><BsPersonFill style={{ marginLeft: "5%", height: '100%', width: "100%" }} ></BsPersonFill> <BsJustify style={{ marginLeft: "5%", height: '100%', width: "100%" }} />
                    <NavDropdown title={user.name} id="basic-nav-dropdown" style={{ marginLeft: "5%", height: '100%', width: "100%" }}>
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
            </div>

        </>
    )
}
export default Header;
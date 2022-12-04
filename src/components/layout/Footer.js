import React from "react";
import { Image } from "react-bootstrap";
import logo from "../../image/ou.png";

const Footer = () => {
    return (
        <div className="footer">
            <Image src={logo} className="logo-footer">

            </Image>
            <div className="content-footer" >
                Privacy Policy<br /> Do not sell my personal info Terms of<br /> Service nbcnews.com Site Map
            </div>
            <div className="group-contact-footer">
                About Contact Careers Coupons
            </div>

        </div>
    )
}
export default Footer;
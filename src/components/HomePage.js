import React from "react";
import { Container } from "react-bootstrap";
import Header from "./layout/Header";
import Image from 'react-bootstrap/Image'
import test from './image 44.png';
import test2 from './image 46.png';
import test3 from './image 50.png';
import test4 from './image 47.png';
import Footer from "./layout/Footer";
const HomePage = () => {


    return (
        <>
            <Header />
            <Container  >
                <div className="banner" >
                    <Image src={test} style={{
                        width: '550px',
                        height: '500px',
                        left: '5%',
                        top: '60px',
                        position: 'relative',

                    }} />
                    <div className="content-banner" > </div>
                </div>
                <div style={{ height: '80px', background: "#C31815", }} >
                    <div style={{ height: '40px', width: '150px', background: 'white', position: 'relative', left: '20%', top: '25%' }} >

                    </div>
                </div>
                <div className="list-new" >
                    <div className="item-new" >
                        <Image src={test2} style={{
                            width: '438px',
                            height: '220px',
                            position: 'relative',

                        }} />

                    </div>
                    <div className="item-new" >
                        <Image src={test3} style={{
                            width: '438px',
                            height: '220px',
                            position: 'relative',

                        }} />

                    </div>
                    <div className="item-new" >
                        <Image src={test} style={{
                            width: '438px',
                            height: '220px',
                            position: 'relative',

                        }} />

                    </div>
                    <div className="item-new" >
                        <Image src={test4} style={{
                            width: '438px',
                            height: '220px',
                            position: 'relative',

                        }} />


                    </div>

                </div>

            </Container>
            <Footer />
        </>
    )
}
export default HomePage;
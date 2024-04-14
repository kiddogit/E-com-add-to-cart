import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { BsCartFill } from 'react-icons/bs';

const Navbar = () => {
    return (
        <>
            <Navbar bg='light' expand='lg' className='bg-body-tertiary mb-3 mt-3'>
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href='/'>Dashboard</Nav.Link>
                            <Nav.Link href="/productlist">ProductList</Nav.Link>
                            <Nav.Link href='/user'>Userlist</Nav.Link>
                            <Nav.Link href='/login'>Login</Nav.Link>
                            <Nav.Link>
                                <BsCartFill />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navbar;


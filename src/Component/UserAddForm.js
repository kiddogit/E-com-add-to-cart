import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const UserAddForm = ({ showHideAddUserModal, getAllUserList }) => {
    const [userForm, setUserForm] = useState({
        email: '',
        username: '',
        password: '',
        name: {
            firstname: '',
            lastname: '',
        },
        address: {
            city: '',
            street: '',
            number: '',
            zipcode: '',
            geolocation: {
                lat: '',
                long: '',
            }
        },
        phone: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserForm({ ...userForm, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: userForm.email,
            username: userForm.username,
            password: userForm.password,
            firstname: userForm.name.firstname,
            lastname: userForm.name.lastname,
            city: userForm.address.city,
            street: userForm.address.street,
            number: userForm.address.number,
            zipcode: userForm.address.zipcode,
            phone: userForm.phone,
        }
        axios.post('https://fakestoreapi.com/users', payload)
            .then((res) => {
                console.log(res.data);
                showHideAddUserModal();
                getAllUserList();
            }).catch((err) => {
                console.log(err.response);
            })
    }

    return (
        <Modal show={true} onHide={showHideAddUserModal} size='lg'>
            <Form onSubmit={handleSubmit}>

                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className='mb-3'>
                        <Form.Group as={Col} md='4' controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='text'
                                name='email'
                                value={userForm.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='username'>
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                                type='text'
                                name='username'
                                value={userForm.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='text'
                                name='password'
                                value={userForm.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='firstname'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='firstname'
                                value={userForm.firstname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='lastname'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='lastname'
                                value={userForm.lastname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type='text'
                                name='city'
                                value={userForm.city}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='street'>
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                type='text'
                                name='street'
                                value={userForm.street}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='number'>
                            <Form.Label>Number</Form.Label>
                            <Form.Control
                                type='number'
                                name='number'
                                value={userForm.number}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='zipcode'>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                type='number'
                                name='zipcode'
                                value={userForm.zipcode}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='phone'>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type='number'
                                name='phone'
                                value={userForm.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='danger' className='btn-sm' onClick={showHideAddUserModal}>Cancel</Button>
                    <Button variant='primary' className='btn-sm' type='submit'>Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UserAddForm;

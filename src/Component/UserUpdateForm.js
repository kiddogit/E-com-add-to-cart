import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const UserUpdateForm = ({ hide, getAllUserList, id }) => {
    const [userForm, setUserForm] = useState({
        id: '',
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

    useEffect(() => {
        getUserList();
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        updateUser(id);
    }

    const updateUser = () => {
        const payload = {
            id: id,
            email: userForm.email,
            username: userForm.username,
            password: userForm.password,
            firstname: userForm.firstname,
            lastname: userForm.lastname,
            city: userForm.city,
            street: userForm.street,
            number: userForm.number,
            zipcode: userForm.zipcode,
            phone: userForm.phone,
        }
        axios.put(`https://fakestoreapi.com/users/${id}`, payload)
            .then((res) => {
                console.log(res.data);
                hide();
                getAllUserList();
            }).catch((err) => {
                console.log(err.response);
            })
    }

    const getUserList = () => {
        axios.get(`https://fakestoreapi.com/users/${id}`)
            .then((res) => {
                const data = res.data;

                setUserForm({
                    id: data.id,
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    firstname: data.name.firstname,
                    lastname: data.name.lastname,
                    city: data.address.city,
                    street: data.address.street,
                    number: data.address.number,
                    zipcode: data.address.zipcode,
                    phone: data.phone,
                })
            })
    }

    return (
        <Modal show={true} onHide={hide} size='lg'>
            <Form onSubmit={handleUpdate}>

                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className='mb-3'>
                        <Form.Group as={Col} md='4' controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='text'
                                name='email'
                                value={userForm.email}
                                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='username'>
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                                type='text'
                                name='username'
                                value={userForm.username}
                                onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='text'
                                name='password'
                                value={userForm.password}
                                onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='firstname'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='firstname'
                                value={userForm.firstname}
                                onChange={(e) => setUserForm({ ...userForm, firstname: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='lastname'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='lastname'
                                value={userForm.lastname}
                                onChange={(e) => setUserForm({ ...userForm, lastname: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type='text'
                                name='city'
                                value={userForm.city}
                                onChange={(e) => setUserForm({ ...userForm, city: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='street'>
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                type='text'
                                name='street'
                                value={userForm.street}
                                onChange={(e) => setUserForm({ ...userForm, street: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='number'>
                            <Form.Label>Number</Form.Label>
                            <Form.Control
                                type='number'
                                name='number'
                                value={userForm.number}
                                onChange={(e) => setUserForm({ ...userForm, number: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='zipcode'>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                type='number'
                                name='zipcode'
                                value={userForm.zipcode}
                                onChange={(e) => setUserForm({ ...userForm, zipcode: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md='4' controlId='phone'>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type='number'
                                name='phone'
                                value={userForm.phone}
                                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='danger' className='btn-sm' onClick={hide}>Cancel</Button>
                    <Button variant='primary' className='btn-sm' type='submit'>Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UserUpdateForm;

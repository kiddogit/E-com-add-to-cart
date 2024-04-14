import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'

const UserDetail = ({ id, hide }) => {

    const [userDetail, setUserDetail] = useState('');

    const getUserDetails = () => {
        axios.get(`https://fakestoreapi.com/users/${id}`)
            .then((res) => {
                setUserDetail(res.data);
            }).catch((error) => {
                console.log(error.response);
            })
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <>
            <Modal show={true} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>User Detail</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col>
                            <p>Email: {userDetail.email}</p>
                            <p>Name: {userDetail.name && userDetail.name.firstname}</p>
                            <p>Address: {userDetail.address && userDetail.address.city}</p>
                            <p>Phone: {userDetail.phone}</p>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserDetail;

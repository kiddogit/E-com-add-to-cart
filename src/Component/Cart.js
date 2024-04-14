import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { BsFillTicketDetailedFill } from 'react-icons/bs';
import CartDetail from './CartDetail';

const Cart = () => {

    const [cart, setCart] = useState('');

    const [cartDetailModal, setCartDetailModal] = useState(false);
    const [id, setId] = useState();

    const showHideCartDetailModal = (id) => {
        setCartDetailModal(!cartDetailModal);
        setId(id);
    }

    const getAllCart = () => {
        axios.get('https://fakestoreapi.com/carts')
            .then((res) => {
                setCart(res.data);
            }).catch((error) => {
                console.log(error.response);
            })
    }

    useEffect(() => {
        getAllCart();
    }, []);

    return (
        <>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <h1 className='text-center'>Cart List</h1>

                    <Table hover bordered striped>
                        <thead>
                            <tr className='text-center'>
                                <th>#</th>
                                <th>UserId</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody className='text-center'>
                            {cart && cart.map((c, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{c.userId}</td>
                                    <td>{c.date}</td>
                                    <td>
                                        <Row>
                                            <Col>
                                                <Button
                                                    onClick={() => showHideCartDetailModal(c.id)}
                                                    className='mt-2 mb-2 btn-sm border-0 shadow'
                                                >
                                                    <BsFillTicketDetailedFill />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {cartDetailModal && (
                <CartDetail hide={showHideCartDetailModal} id={id} />
            )}
        </>
    )
}

export default Cart;

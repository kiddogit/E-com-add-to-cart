import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Row } from 'react-bootstrap';
import CartProduct from './CartProduct';

const CartDetail = ({ hide, id }) => {

    const [cartDetail, setCartDetail] = useState('');

    const getCartDetail = () => {
        axios.get(`https://fakestoreapi.com/carts/${id}`
        ).then((res) => {
            setCartDetail(res.data);
        }).catch((err) => {
            console.log(err.response);
        })
    }


    useEffect(() => {
        getCartDetail();
    }, []);

    return (
        <Modal size='lg' show={true} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Cart Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <p>ID: {cartDetail.id}</p>

                    {cartDetail.products && cartDetail.products.map((cp) => (
                        <CartProduct productId={cp.productId} quantity={cp.quantity} />
                    ))}
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default CartDetail;

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, Image } from 'react-bootstrap';

const CartProduct = ({ productId, quantity }) => {

    const [productData, setProductData] = useState('');

    const getCartProduct = () => {
        axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => {
                setProductData(res.data);
            }).catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        getCartProduct();
    }, []);

    return (
        <Col md={3} className='card-group mb-3'>
            <Card
                style={{
                    width: '18rem'
                }}
            >
                <Image
                    src={productData.image}
                    className='object-fit-fill border rounded card-img-top zoom-300'
                    alt="" thumbnail
                />

                <Card.Body>
                    <Card.Title>
                        <p className="mt-2 card-text">Product: {productData.title}</p>
                    </Card.Title>
                    <p className="mt-2 card-text">Quantity: {quantity}</p>
                    <p className="mt-2 card-text">Price: {productData.price}</p>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CartProduct;

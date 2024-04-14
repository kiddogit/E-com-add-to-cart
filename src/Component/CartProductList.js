import React, { useEffect, useState } from 'react'
import CartProduct from './CartProduct';
import { Button, Card, Container, Row } from 'react-bootstrap';
import axios from 'axios';

const CartProductList = () => {
    const [product, setProduct] = useState('');

    useEffect(() => {
        setProduct(JSON.parse(sessionStorage.getItem('products')));
    }, []);      // setup, dependencies?

    const handleSubmit = (e) => {
        e.preventDefault();

        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();
        const currentDate = date.getDate();
        const fullDate = currentYear + '-' + currentMonth + '-' + currentDate;

        const payload = {
            userId: 2,
            date: fullDate,
            products: product
        }
        axios.post('https://fakestoreapi.com/carts', payload)
            .then((res) => {
                console.log(res.data);
            })
    }

    return (
        <Container fluid='xxl'>
            <Card className='mb-4 mt-4'>
                <Card.Header className='text-bg-primary'>
                    <Card.Title>Cart Product List</Card.Title>
                </Card.Header>

                <Card.Body>
                    <Row>
                        {product && product.map((cp) => (
                            <CartProduct productId={cp.productId} quantity={cp.quantity} />
                        ))}
                    </Row>
                </Card.Body>

                <Card.Footer>
                    <Button
                        className='float-end btn-sm'
                        onClick={handleSubmit}
                    >
                        Check Out
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default CartProductList;

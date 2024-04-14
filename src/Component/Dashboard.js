import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';
import axios from 'axios';

const Dashboard = () => {

    const [productlist, setProductList] = useState('');
    const [limit, setLimit] = useState(5);

    const getallproduct = () => {
        axios.get(`https://fakestoreapi.com/products?limit=${limit}`)
            .then((res) => {
                setProductList(res.data);
            })
    }

    useEffect(() => {
        getallproduct();
    }, [limit]);

    const handleChange = (e) => {
        const { value } = e.target;
        setLimit(value);
    }

    return (
        <Container fluid>
            <Row className='mx-3'>
                <Col md={{ span: 8, offset: 1 }}>
                    <h1 className='text-center'>
                        <small>Dashboard</small>
                    </h1>
                </Col>
            </Row>

            <AddProductForm />

            <ProductList
                productlist={productlist}
                limit={limit}
                handleChange={handleChange}
            />
        </Container>
    )
}

export default Dashboard;

import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const ProductLimitFilter = ({ limit, handleChange }) => {
    return (
        <Form className='mb-3'>
            <Row>
                <Col md={{ span: 3 }}>
                    <Form.Group controlId='ProductLimit'>
                        <Form.Label>Total Product</Form.Label>
                        <Form.Control
                            name='limit'
                            type='text'
                            placeholder='Products Limit'
                            value={limit}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

export default ProductLimitFilter;

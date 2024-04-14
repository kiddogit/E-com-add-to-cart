import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const UserLimitFilter = ({ limit, handleChange }) => {
    return (
        <Form className='mb-3'>
            <Row>
                <Col md={{ span: 3 }}>
                    <Form.Group controlId='LimitUser'>
                        <Form.Label>Total User</Form.Label>
                        <Form.Control
                            name='limit'
                            type='text'
                            placeholder='Limit User'
                            value={limit}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

export default UserLimitFilter;

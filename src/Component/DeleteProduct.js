import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const DeleteProduct = ({ hide, id }) => {

    const handleDelete = () => {
        axios.delete(`https://fakestoreapi.com/products/${id}`
        ).then((res) => {
            hide();
            alert("Product deleted successfully");
        }).catch((err) => {
            console.error(err.response);
        });
    };

    return (
        <>
            <Modal show={true} size='small' onHide={hide}>
                <Modal.Body>
                    <p>Are you sure you want to delete this product?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDelete} variant='primary'>Confirm</Button>
                    <Button onClick={hide} variant='secondary'>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteProduct;


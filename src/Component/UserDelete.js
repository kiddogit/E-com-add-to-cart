import axios from 'axios'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const UserDelete = ({ hide, id }) => {

    const handleDelete = () => {
        axios.delete(`https://fakestoreapi.com/users/${id}`
        ).then((res) => {
            hide();
            alert("User deleted successfully");
        }).catch((err) => {
            console.log(err.response);
        })
    }
    return (
        <>
            <Modal show={true} size='small' onHide={hide}>
                <Modal.Body>
                    <p>Are you sure you want to Delete this User?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDelete} variant='primary'>Confirm</Button>
                    <Button onClick={hide} variant='secondary'>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserDelete;

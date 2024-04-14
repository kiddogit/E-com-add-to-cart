import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { BsFillTicketDetailedFill, BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import UserLimitFilter from './UserLimitFilter';
import UserAddForm from './UserAddForm';
import UserUpdateForm from './UserUpdateForm';
import UserDetail from './UserDetail';
import UserDelete from './UserDelete';

const Userlist = () => {
    const [userList, setUserList] = useState('');
    const [limit, setLimit] = useState(5);

    const [addUserModal, setAddUserModal] = useState(false);

    const showHideAddUserModal = () => {
        setAddUserModal(!addUserModal);
    }

    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [id, setId] = useState();

    const showHideUpdateUserModal = (id) => {
        setShowUpdateUserModal(!showUpdateUserModal);
        setId(id);
    }

    const [showUserDetail, setUserDetail] = useState(false);

    const showHideUserDetail = (id) => {
        setUserDetail(!showUserDetail);
        setId(id);
    }

    const [showUserDelete, setShowUserDelete] = useState(false);

    const showHideDelete = (id) => {
        setShowUserDelete(!showUserDelete);
        setId(id);
    }

    const getAllUserList = () => {
        axios.get(`https://fakestoreapi.com/users?limit=${limit}`)
            .then((res) => {
                setUserList(res.data);
            }).catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        getAllUserList();
    }, [limit]);

    const handleChange = (e) => {
        const { value } = e.target;
        setLimit(value);
    }

    return (
        <>
            <Button
                onClick={showHideAddUserModal}
                className='float-end mt-3 rounded-0 border-0 shadow btn-sm'
            >
                +Add User
            </Button>

            <Row>
                <Col md={{ span: 11, offset: 1 }}>
                    <h1 className='text-center'>User List</h1>

                    <UserLimitFilter limit={limit} handleChange={handleChange} />

                    <Table striped hover bordered>
                        <thead>
                            <tr className='text-center'>
                                <th>#</th>
                                <th>Id</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone No.</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody className='text-center'>
                            {userList && userList.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name ? user.name.firstname : " "}</td>
                                    <td>{user.address ? user.address.city : ""}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <Row>
                                            <Col md={{ span: 4 }}>
                                                <Button
                                                    onClick={() => showHideUpdateUserModal(user.id)}
                                                    className='mt-2 mb-2 btn-sm border-0 shadow-0'
                                                >
                                                    <BsPencilFill />
                                                </Button>
                                            </Col>

                                            <Col md={{ span: 4 }}>
                                                <Button
                                                    onClick={() => showHideUserDetail(user.id)}
                                                    className='mt-2 mb-2 btn-sm border-0 shadow-0'
                                                >
                                                    <BsFillTicketDetailedFill />
                                                </Button>
                                            </Col>

                                            <Col md={{ span: 4 }}>
                                                <Button
                                                    variant='danger'
                                                    onClick={() => showHideDelete(user.id)}
                                                    className='mt-2 mb-2 btn-sm rounded-0 border-0'
                                                >
                                                    <BsFillTrashFill />
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

            {addUserModal && (
                <UserAddForm
                    showHideAddUserModal={showHideAddUserModal}
                    getAllUserList={getAllUserList}
                />
            )}

            {showUpdateUserModal && (
                <UserUpdateForm
                    hide={showHideUpdateUserModal}
                    id={id}
                />
            )}

            {showUserDetail && (
                <UserDetail
                    hide={showHideUserDetail}
                    id={id}
                />
            )}

            {showUserDelete && (
                <UserDelete
                    hide={showHideDelete}
                    id={id}
                />
            )}
        </>
    )
}

export default Userlist;

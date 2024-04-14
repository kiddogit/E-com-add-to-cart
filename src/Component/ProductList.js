import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import ProductDetail from './ProductDetail';
import { BsCart, BsFillTrashFill, BsPencil } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';
import ProductLimitFilter from './ProductLimitFilter';

const ProductList = ({ productlist, limit, handleChange }) => {

    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productid, setProductId] = useState();

    const [product, setProduct] = useState(0);

    const countCartProducts = () => {
        let cartProducts = JSON.parse(sessionStorage.getItem('products'));

        if (cartProducts) {
            setProduct(cartProducts.length);
        }
    }

    useEffect(() => {
        countCartProducts();
    }, []);

    const navigate = useNavigate();

    const navigateToCart = () => {
        navigate('/cartproductlist');
    }

    const showHideProductModal = (productid) => {
        setProductDetailModal(!productDetailModal);
        setProductId(productid);
    }

    const [productDeleteModal, setProductDeleteModal] = useState(false);
    const [id, setId] = useState();

    const showHideProductDeleteModal = (id) => {
        setProductDeleteModal(!productDeleteModal);
        setId(id);
    }

    return (
        <>
            <Row>
                <Col className='m-3'>
                    <h1 className='text-center'>Product List</h1>

                    <Row>
                        <Col>
                            <ProductLimitFilter
                                limit={limit}
                                handleChange={handleChange}
                            />
                        </Col>

                        <Col>
                            <div className='cart-icon float-end'>
                                <BsCart onClick={navigateToCart} />
                                <sup>{product}</sup>        {/* Add the superscript here */}
                            </div>
                        </Col>
                    </Row>

                    <Table hover responsive striped bordered>
                        <thead>
                            <tr className='text-center'>
                                <th>SN</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {productlist && productlist.map((p, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{p.title}</td>
                                    <td>{p.category}</td>
                                    <td>{p.price}</td>
                                    <td className='text-center'>{p.rating && p.rating.rate}</td>
                                    <td>
                                        <Row>
                                            <Col>
                                                <Button className='btn-sm rounded-0 border-0' onClick={() => showHideProductModal(p.id)}>
                                                    Detail
                                                </Button>
                                            </Col>

                                            <Col>
                                                <Link to={`/updateproductform/${p.id}`}>
                                                    <Button className='btn-sm rounded-0 border-0'>
                                                        <BsPencil />
                                                    </Button>
                                                </Link>
                                            </Col>

                                            <Col>
                                                <Button
                                                    variant='danger'
                                                    onClick={() => showHideProductDeleteModal(p.id)}
                                                    className='btn-sm rounded-0 border-0'
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

            {productDetailModal && (
                <ProductDetail hide={showHideProductModal} productid={productid} countCartProducts={countCartProducts}/>
            )}

            {productDeleteModal && (
                <DeleteProduct hide={showHideProductDeleteModal} id={id} />
            )}
        </>
    )
}

export default ProductList;

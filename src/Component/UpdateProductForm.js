import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios';
import ImageCropper from './ImageCropper';
import { base64StringToBlob } from 'blob-util';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProductForm = () => {

    const { id } = useParams();
    const photoRef = useRef();

    const [productform, setProductForm] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        image: ''
    });

    const navigate = useNavigate();

    const [categories, setCategories] = useState('');
    const [products, setProducts] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const [error, setError] = useState({
        titleError: '',
        priceError: '',
        categoryError: '',
        descriptionError: '',
        imageError: ''
    });

    const [formValid, setFormValid] = useState(false);

    const [photo, setPhoto] = useState('');
    const [photoPreview, setPhotoPreview] = useState('');
    const [cropPreview, setCropPreview] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhoto(file);
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropPhoto = (cropImage) => {
        const imageType = "image/png";
        const base64Image = cropImage.split('base64,')[1];
        const blob = base64StringToBlob(base64Image, imageType);
        const photoFile = new File([blob], 'photo', { type: imageType });
        setPhotoPreview('');
        setCropPreview(URL.createObjectURL(photoFile));
        setPhoto(photoFile);
    }

    const handleUpdate = (e) => {
        e.preventDefault();      // Cancel the default event behavior while allowing us to execute any code. 

        updateproduct(id);
        navigate('/');
    };

    const updateproduct = () => {
        const Payload = {
            id: id,
            title: productform.title,
            price: productform.price,
            category: productform.category,
            description: productform.description,
            image: productform.image
        }
        axios.put(`https://fakestoreapi.com/products/${id}`, Payload)
            .then((res) => {
                alert('Product Updated');
            }).catch((err) => {
                console.log(err.response);
            })
    }

    const getproductlist = () => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((res) => {
                const data = res.data;

                setProductForm({
                    id: data.id,
                    title: data.title,
                    price: data.price,
                    category: data.category,
                    description: data.description,
                    image: data.image,
                })
            })
    }

    const getallcategories = () => {
        axios.get(`https://fakestoreapi.com/products/categories`)
            .then((res) => {
                setCategories(res.data);
            })
    }

    const getallproducts = () => {
        axios.get(`https://fakestoreapi.com/products/category/${categoryName}`)
            .then((res) => {
                setProducts(res.data);
            })
    }

    useEffect(() => {
        getallcategories();
        getallproducts();
        getproductlist();
    }, [categoryName, id]);

    const checkFormValid = () => {
        if (productform.title === '' || productform.category === ''
            || productform.description === '' || productform.image === '') {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }

    const titleValidate = () => {
        if (productform.title === undefined || productform.title === '') {
            setError({ ...error, titleError: "Title is required" });
            checkFormValid();
        } else {
            setError({ ...error, titleError: "" });
            checkFormValid();
        }
    }

    const categoryValidate = () => {
        if (productform.category === undefined || productform.category === '') {
            setError({ ...error, categoryError: "Category is required" });
            checkFormValid();
        } else {
            setError({ ...error, categoryError: "" });
            checkFormValid();
        }
    }

    const descriptionValidate = () => {
        if (productform.description === undefined || productform.description === '') {
            setError({ ...error, descriptionError: "Description is required" });
            checkFormValid();
        } else {
            setError({ ...error, descriptionError: "" });
            checkFormValid();
        }
    }

    const imageValidate = () => {
        if (productform.image === undefined || productform.image === '') {
            setError({ ...error, imageError: "Image is required" });
            checkFormValid();
        } else {
            setError({ ...error, imageError: "" });
            checkFormValid();
        }
    }

    const priceValidate = () => {
        const pricevalue = parseFloat(productform.price);    // Used to accept a string and convert it into a floating-point number
        if (isNaN(pricevalue) || pricevalue === undefined
            || pricevalue === '' || pricevalue < 1) {
            setError({ ...error, priceError: "Invalid Price" });
            checkFormValid();
        } else {
            setError({ ...error, priceError: "" });
            checkFormValid();
        }
    }

    return (
        <Container fluid>
            <Card>
                <Card.Header
                    style={{
                        backgroundColor: '#176B87',
                        color: '#ffffff'
                    }}
                >
                    Edit Product Form
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleUpdate}>
                        <Row>
                            <Form.Group as={Col} md='4' className='mb-3' controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    id='title'
                                    value={productform.title}
                                    onChange={(e) => setProductForm({ ...productform, title: e.target.value })}
                                    onBlur={titleValidate}      // onblur event is often used with form validation (when the user leaves a form field) || (An element loses focus)
                                    isInvalid={error.titleError !== '' ? true : false}
                                />
                                <Form.Control.Feedback type='inValid' className='text-danger'>
                                    {error.titleError}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md='4' className='mb-3' controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    required
                                    type='number'
                                    id='price'
                                    value={productform.price}
                                    onChange={(e) => setProductForm({ ...productform, price: e.target.value })}
                                    onBlur={priceValidate}
                                    isInvalid={error.priceError !== '' ? true : false}
                                />
                                <Form.Control.Feedback type='inValid' className='text-danger'>
                                    {error.priceError}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md='4' className='mb-3' controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as='select'
                                    id='category'
                                    value={productform.category}
                                    onBlur={categoryValidate}
                                    onChange={(e) => setProductForm({ ...productform, category: e.target.value })}
                                    isInvalid={error.categoryError !== '' ? true : false}
                                >
                                    <option value=''>Select Category</option>
                                    {categories && categories.map((c, index) => (
                                        <option
                                            key={index} value={c} name='category'
                                        >{c}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type='inValid' className='text-danger'>
                                    {error.categoryError}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} md='8' className='mb-3' controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    id='description'
                                    value={productform.description}
                                    onChange={(e) => setProductForm({ ...productform, description: e.target.value })}
                                    onBlur={descriptionValidate}
                                    isInvalid={error.descriptionError !== '' ? true : false}
                                />
                                <Form.Control.Feedback type='inValid' className='text-danger'>
                                    {error.descriptionError}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md='4' controlId="formFileSm" className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    required
                                    ref={photoRef}
                                    type="file"
                                    size="sm"
                                    id='image'
                                    onChange={handleImageChange}     // {/* This is where the image change is handled */}
                                    onBlur={imageValidate}
                                    isInvalid={error.imageError !== '' ? true : false}
                                />
                                <Form.Control.Feedback type='inValid' className='text-danger'>
                                    {error.imageError}
                                </Form.Control.Feedback>

                                {photoPreview && (
                                    <ImageCropper photosrc={photoPreview} handleCropPhoto={handleCropPhoto} />
                                )}

                                {cropPreview && (
                                    <img
                                        src={cropPreview}
                                        alt='Selected'
                                        style={{ width: '100%', marginTop: '10px' }}
                                    />
                                )}
                            </Form.Group>
                        </Row>

                        <Row>
                            <Col>
                                <Button
                                    disabled={!formValid}
                                    className='float-end btn-sm shadow'
                                    variant="primary"
                                    onClick={handleUpdate}
                                >
                                    Save
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </Card.Body>
            </Card>
        </Container >
    )
}

export default UpdateProductForm;

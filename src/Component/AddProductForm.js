import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios';
import ImageCropper from './ImageCropper';
import { base64StringToBlob } from 'blob-util';

const AddProductForm = () => {

    const photoRef = useRef();

    const [productform, setProductForm] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        image: ''
    });

    const [categories, setCategories] = useState('');

    const [products, setProducts] = useState('');
    const [productName, setProductName] = useState();

    const [categoryName, setCategoryName] = useState('');

    const [isActive, setIsActive] = useState(false);
    const [fruits, setFruits] = useState(['Apple', 'Orange', 'Grapes']);    // Array 
    const [selectedFruit, setSelectedFruit] = useState('');

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

    const resetPhoto = () => {
        setPhoto('');
        setCropPreview('');
        setPhotoPreview('');
        photoRef.current.value = '';
    }

    const handleSubmit = (e) => {
        e.preventDefault();      // Cancel the default event behavior while allowing us to execute any code. 

        axios.post('https://fakestoreapi.com/products')
            .then((res) => {
                if (res.status === 200) {
                    clearState();
                    alert("Product Saved " + res.data.id);
                }
            }).catch((err) => {
                console.log(err.response);
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
    }, [categoryName]);

    const handleProductCategoryChange = (e) => {
        setCategoryName(e.target.value);
    }

    const handleChange = (e) => {
        e.persist();   // Data can be persisted locally using AsyncStorage.

        setProductForm({ ...productform, [e.target.name]: e.target.value });
    }

    const checkFormValid = () => {
        if (productform.title === '' ||
            productform.category === '' ||
            productform.description === '' ||
            !photo ||
            isNaN(parseFloat(productform.price)) ||
            parseFloat(productform.price) < 1
        ) {
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

    const clearState = () => {
        setProductForm({
            title: '',
            price: '',
            category: '',
            description: '',
            image: ''
        });
        setError({
            titleError: '',
            priceError: '',
            categoryError: '',
            descriptionError: '',
            imageError: ''
        });
        setFormValid(false);
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
                    Add Product Form
                </Card.Header>

                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col} md='4' className='mb-3' controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    name='title'
                                    placeholder='Enter Title'
                                    value={productform.title}
                                    onChange={handleChange}
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
                                    name='price'
                                    placeholder='Enter Price'
                                    value={productform.price}
                                    onChange={handleChange}
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
                                    name='category'
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
                                    name='description'
                                    placeholder='Enter Description'
                                    value={productform.description}
                                    onChange={handleChange}
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
                                    name='image'
                                    placeholder='Enter Image'
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
                                <Button
                                    variant='danger'
                                    className='btn-sm border-0 rounded-0 float-end'
                                    onClick={resetPhoto}
                                >
                                    Reset
                                </Button>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} md='4' className='mb-3' controlId='categoryName'>
                                <Form.Label>Product Category</Form.Label>
                                <Form.Control
                                    as='select'
                                    name='categoryName'
                                    value={categoryName}
                                    onChange={handleProductCategoryChange}
                                >
                                    <option value=''>Select Product Category</option>
                                    {categories && categories.map((c, index) => (
                                        <option
                                            key={index} value={c} name='categoryName'
                                        >{c}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} md='4' className='mb-3' controlId='productName'>
                                <Form.Label>Product</Form.Label>
                                <Form.Control
                                    as='select'
                                    name='productName'
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                >
                                    {products && products.map((p, index) => (
                                        <option
                                            key={index} value={p.id} name='productName'
                                        >{p.title}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} md='4' controlId='isActive'>
                                <Form.Check
                                    label='isActive'
                                    type='checkbox'
                                    name='isActive'
                                    checked={isActive}
                                    onChange={() => setIsActive(!isActive)}
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} md='4' controlId='fruitsradio'>
                                {fruits.map((f) => (
                                    <Form.Check
                                        key={f}
                                        label={f}
                                        type='radio'
                                        name='fruits'
                                        id={f}
                                        value={f}
                                        checked={selectedFruit === f}
                                        onChange={(e) => setSelectedFruit(e.target.value)}
                                    />
                                ))}
                            </Form.Group>
                        </Row>

                        <Row>
                            <Col>
                                <Button
                                    disabled={!formValid}
                                    className='float-end btn-sm shadow'
                                    variant="primary"
                                    onClick={handleSubmit}
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

export default AddProductForm;

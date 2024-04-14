import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Image, Modal, Row } from 'react-bootstrap'

const ProductDetail = ({ hide, productid, countCartProducts }) => {

  const [productDetail, setProductDetail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [buttonDisable, setButtonDisable] = useState(false);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const checkButtonDisable = () => {
    if (quantity === 1) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }

  const addToCart = () => {
    let products = sessionStorage.getItem('products');

    if (products === null) {
      products = [];
    } else {
      products = JSON.parse(products);
    }

    // Create an object to represent the current product and its quantity.
    const productToAdd = {
      productId: productDetail.id, // Assuming 'id' is a unique identifier for products.
      quantity,
    };

    // Check if the product is already in the cart. If so, update its quantity.
    const existingProductIndex = products.findIndex((item) => item.productId === productDetail.id);
    if (existingProductIndex !== -1) {
      products[existingProductIndex].quantity += quantity;
    } else {
      // If it's a new product, add it to the cart.
      products.push(productToAdd);
    }

    // Save the updated 'products' array back to sessionStorage.
    sessionStorage.setItem('products', JSON.stringify(products));
    countCartProducts();
    alert('Product added to cart successfully!');
  }

  const getProductDetails = () => {
    axios.get(`https://fakestoreapi.com/products/${productid}`
    ).then((res) => {
      setProductDetail(res.data);
    }).catch((err) => {
      console.log(err.response);
    })
  }

  useEffect(() => {
    getProductDetails();
    checkButtonDisable();
  }, [quantity]);

  return (
    <Modal show={true} size='lg' onHide={hide}>
      <Modal.Header closeButton closeVariant='black'
        style={{
          backgroundColor: '#1F8A70'
        }}
      >
        <Modal.Title>Product Details {productDetail.title}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Row>
          <Col>
            <Image src={productDetail.image} alt='' thumbnail />
          </Col>

          <Col>
            <p>Category: {productDetail.category} </p>
            <p className='p-3'>{productDetail.description}</p>
            <p>Price: ${productDetail.price} </p>
            <p>Rating: {productDetail.rating && productDetail.rating.rate} </p>

            <Row className='my-2'>
              <Col>
                <Button
                  className='btn-sm btn-info rounded-0 border-0 mx-2'
                  disabled={buttonDisable}
                  onClick={decreaseQuantity}
                >
                  -
                </Button>

                {quantity}

                <Button
                  className='btn-sm btn-info rounded-0 border-0 mx-2'
                  onClick={increaseQuantity}
                >
                  +
                </Button>
              </Col>
            </Row>

            <Button
              variant="primary"
              className="btn-sm"
              type="submit"
              onClick={addToCart}
            >
              +Add to cart
            </Button>

          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default ProductDetail;

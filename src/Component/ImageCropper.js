import React, { useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { Cropper } from 'react-cropper';
import "cropperjs/dist/cropper.css"

const ImageCropper = ({ photosrc, handleCropPhoto }) => {

    const cropperRef = useRef();
    const [cropImage, setCropImage] = useState('');

    const handleCropChange = () => {
        const cropImageData = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
        setCropImage(cropImageData);
    }

    return (
        <>
            <Row>
                <Col>
                    <Cropper
                        ref={cropperRef}
                        src={photosrc}
                        cropend={handleCropChange}
                        initialAspectRatio={1}
                        aspectRatio={1}
                        dragMode={"move"}
                        style={{ maxWidth: '600px', height: '400px' }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        variant='primary'
                        className='btn-sm border-0 rounded-0'
                        onClick={() => handleCropPhoto(cropImage)}
                    >
                        Crop
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default ImageCropper;

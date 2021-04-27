import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import knownIds from '../references/knownIds';
import Button from './Button';

const ProductDetails = () => { 
    const { id } = useParams(); 

    const [product, setProduct] = useState(null)
    const [images, setImages] = useState([])
    const [attributes, setAttributes] = useState([])
    const [focusedImage, setFocusedImage] = useState(knownIds.mainProductImage)
  
    useEffect(() => {
      const getProduct = async () => {
        const productFromServer = await fetchEntities('Products');
        setProduct(productFromServer.filter((prod) => prod.id === id)[0]);
      }
  
      const getImages = async () => {
        const imagesFromServer = await fetchEntities('Images');
        setImages(imagesFromServer)
      }
  
      const getAttributes = async () => {
        const attributesFromServer = await fetchEntities('Attributes');
        setAttributes(attributesFromServer)
      }
  
      getProduct();
  
      getImages();
  
      getAttributes();
      
    }, [])

    const fetchEntities = async (serverName) => {
        const res = await fetch(`http://localhost:5000/${serverName}`)
        const data = await res.json()
    
        return data;
      }

    const getAttributeValue = (product, attributeId) => {
        const targetAtt = product.attributes
        .filter((att) => att.id === attributeId)[0];

        if(targetAtt){
            return targetAtt.value;
        }
        return 'NO INFORMATION'
    }

    const getAttributeName = (attributeId) => {
        const targetAtt = attributes
        .filter((att) => att.id === attributeId)[0];

        if(targetAtt){
            return targetAtt.name;
        }
        return 'NO INFORMATION'
    }

    const getImageSrc = (product, attributeId) => {
        const imageId = product.images
        .filter((image) => image.attribute === attributeId)[0].id;

        const targetImage = images.filter((image) => image.id === imageId)[0];

        if (targetImage !== null && targetImage !== undefined){
            return targetImage.src;
        }else{
            return 'no image found';
        }

    }

    const updateFocusedImage = (imageAttributeId) => {
        setFocusedImage(imageAttributeId);
    }

    return (
        <div>
            <Button text='Return to list' action='products' big={false}/>
            {product !== null && <div>
                <h1>{getAttributeValue(product, knownIds.productName)}</h1>
                <div className='container'>
                    <div className='row'>
                    <div className='col-md-3'>
                        {product.images
                            .filter((image) => image.attribute !== focusedImage)
                            .map((unFocused) => (
                                <div key={unFocused.attribute} 
                                    className='image-container'
                                    onClick={() => updateFocusedImage(unFocused.attribute)}>
                                    <img className='unfocused-image'                                   
                                        src={getImageSrc(product, unFocused.attribute)}
                                        alt={getAttributeName(unFocused.attribute)}
                                        />
                                        <p>{getAttributeName(unFocused.attribute)}</p>
                                </div>                          
                            ))}
                        </div>
                        <div className='col-md-4'>
                            <img
                                className='focused-image'
                                src={getImageSrc(product, focusedImage)} 
                                alt={getAttributeName(focusedImage)}/>
                                <p>{getAttributeName(focusedImage)}</p>
                        </div>                  
                    </div>
                </div>          
            </div> }
         </div>  
    )
}

export default ProductDetails
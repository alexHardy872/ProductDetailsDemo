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
            <div className='float-left'>
                <Button text='Return to list' action='products' big={false}/>
            </div>
            {product !== null && 
            <div>
                <div className='flex-container page-pad-big'>

                    <div className='image-selector'>
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
                                </div>                          
                            ))}
                        </div>
                        <div className='main-image'>
                            <img
                                className='focused-image'
                                src={getImageSrc(product, focusedImage)} 
                                alt={getAttributeName(focusedImage)}/>
                                <p>{getAttributeName(focusedImage)}</p>
                        </div>  
                        <div className='details'>
                            <h1 className='left product-name'>{getAttributeValue(product, knownIds.productName)}</h1>
                            {product.attributes
                            .filter((att) => att.id !== knownIds.productName)
                            .map((attribute) => (
                                <div className='full' key={attribute.id}>
                                    <div className='half inline top left att-name'>
                                        <p>{getAttributeName(attribute.id)}</p>
                                    </div>
                                    <div className='half inline top left att-val'>
                                        <p>{attribute.value}</p>
                                    </div>
                                </div>
                            ))}
           
                        </div>                
                    </div>
                        
            </div> }
         </div>  
    )
}

export default ProductDetails
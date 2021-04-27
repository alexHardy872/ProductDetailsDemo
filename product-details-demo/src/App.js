import './App.css';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Header from './components/Header';
import Button from './components/Button';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const productsFromServer = await fetchEntities('Products');
      setProducts(productsFromServer);
    }

    const getImages = async () => {
      const imagesFromServer = await fetchEntities('Images');
      setImages(imagesFromServer)
    }

    getProducts();

    getImages();
    
  }, [])

  const fetchEntities = async (serverName) => {
    const res = await fetch(`http://localhost:5000/${serverName}`)
    const data = await res.json()

    return data;
  }

  return (
    <Router>
      <div className="App">
        <Header/>
        <div className='under-header full'>
          <Route path='/' exact render={(props) => (
            <div className='full'>
              <h2 className='center'>Welcome to the demoDb viewer!</h2>
              <div className='inline'>
                <Button text='Products'/>
                <Button text='Images'/>
              </div>
            </div>
          )}/>
      
          <Route path='/products' exact render={(props) => (
            <>
              {products.length > 0 && <ProductList 
                products={products} 
                images={images}/>}
            </>
          )}/>
           <Route path='/images' exact render={(props) => (
            <div>
              <h1>Images coming soon!</h1>
              </div>
          )}/>
          <Route path={`/products/:id`} render={(props) => (
            <>
            <h1> product detail page </h1>
            <ProductDetails/>
            </>
          )} />
        </div>
      </div>
    </Router>
  );
}

export default App;

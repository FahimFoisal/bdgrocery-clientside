import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';

import Products from '../Products/Products';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const handleCheckOut = (item) => {
    delete item._id;
    item['email'] = loggedInUser.email;
    if (loggedInUser.email) {
      fetch('https://limitless-tor-25486.herokuapp.com/checkout', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(item)
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }  
  }
  const [product,setProduct] = useState([]);
  useEffect(() => {
    fetch('https://limitless-tor-25486.herokuapp.com/products')
    .then(res => res.json())
    .then(data => setProduct(data))
  },[])
    // const {_id, image, title, price} = props.info
    // console.log(props.handleCheckOut)
    return (
      <div className="row w-75 mx-auto justify-content-center mt-5" style={{marginBottom: '110px'}}>
        <div className="d-flex justify-content-center mb-5">
        <input className="form-control w-25" style={{borderColor:'rgb(13,110,253)', borderRadius: 'none'}} type="search" name="" id="" placeholder="Search"/>
        <button style={{border:'none'}} className="btn btn-primary">Search</button>
        </div>
        {
          (product.length === 0) && <div class="spinner-border text-primary m-5" role="status"><span class="visually-hidden">Loading...</span></div>
        }
        {
          product.map( item => <Products handleCheckOut={handleCheckOut} productItem={item}></Products>)
        }
      </div>
    );
};

export default Home;
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Orders from './Components/AddProduct/AddProduct';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import dataF from './DATA.json';
import Buy from './Components/Buy/Buy';
import Admin from './Components/Admin/Admin';
import ManageProduct from './Components/ManageProduct/ManageProduct';
import AddProduct from './Components/AddProduct/AddProduct';
import Order from './Components/Order/Order';

export const userContext = createContext();
function App() {
  
  const [cart, setCart] = useState([]);
//   const handleCheckOut = (product) => {
//     product['email'] = loggedInUser.email;
//     console.log(product)
//     // const newCart = [...cart,product];
//     // setCart(newCart);
//     // console.log(product)
//     // localStorage.setItem('total',JSON.stringify(cart[0]))
//     fetch('https://limitless-tor-25486.herokuapp.com/buy',{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(product)
//     })
//   }
// //   fetch('https://limitless-tor-25486.herokuapp.com/addEvents', {
// //   method: 'POST',
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// //   body: JSON.stringify(dataF)
// // })
// // .then((response) => response.json())
// // //Then with the data from the response in JSON...
// // .then((data) => {
// //   console.log('Success:', data);
// // })
// // //Then with the error genereted...
// // .catch((error) => {
// //   console.error('Error:', error);
// // });

  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div>
      
    <userContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">BD Grocery Store</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-flex flex-row-reverse px-5" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item pr-4">
                  <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
                </li>
                <li class="nav-item  pr-4">
                  <Link to="/orders" style={{ textDecoration: 'none' }}>Orders</Link>
                </li>
                <li class="nav-item pr-4">
                  <Link to="/admin" style={{ textDecoration: 'none' }}>Admin</Link>
                </li>
                <li class="nav-item pr-4">
                  <Link to="/deals" style={{ textDecoration: 'none' }}>Deals</Link>
                </li>
                {
                  loggedInUser.email ? (<li class="nav-item  pr-4">
                  <Link to="/login" style={{ textDecoration: 'none' }}>{loggedInUser.displayName}</Link>
                </li>) : (<li class="nav-item pr-4">
                  <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                </li>)
                }
                
              </ul>
            </div>
          </div>
        </nav>
        <div>
          <Switch>
            {/* <Route path="/login">
              <Login></Login>
            </Route> */}
            {/* <Route path="/signIn">
              <SignIn></SignIn>
            </Route> */}
            {/* <Route path="/contact">
              
            </Route> */}
            <Route path='/login'>
              <Login></Login>
            </Route>
            <Route path="/manageProduct">
              <Admin></Admin>
            </Route>
            <Route path="/orders">
              <Order></Order>
            </Route>
            <Route path="/addProduct">
              <AddProduct></AddProduct>
            </Route>
            <PrivateRoute path='/buy'>
              <Buy></Buy>
            </PrivateRoute>
            <Route path="/admin">
              <Admin></Admin>
            </Route>
            <Route exact path="/">
              {/* {
                  {product.map(e => <Home handleCheckOut={handleCheckOut} info={e}></Home>)}
              } */}
              <Home></Home>
            </Route>
          </Switch>
        </div>
      </Router>
    </userContext.Provider>
    </div>
  );
}

export default App;

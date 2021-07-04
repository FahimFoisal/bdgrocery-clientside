import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';


const Buy = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [buy, setBuy] = useState([]);
    const [orderItem, setOrderItem] = useState({});
    useEffect(() => {
        fetch('https://limitless-tor-25486.herokuapp.com/checkout/?email='+loggedInUser.email)
            .then(res => res.json())
            .then(data => setBuy(data))
    }, [])
    let sum = 0;
    buy.map(itemPrice => {
        sum = sum + parseFloat(itemPrice.price);
        return sum;
    })
    const handleOrder = () => {
        const checkoutSection = document.getElementsByClassName('checkout-section');
        const orderSection = document.getElementsByClassName('order-section');
        checkoutSection[0].style.display = 'none';
        orderSection[0].style.display = 'block';
    }
    const confirmOrder = (orders) => {
        const orderDate = new Date();
        const newOrder = {...orderItem};
        newOrder['date'] = orderDate;
        newOrder['email'] = loggedInUser.email; 
        const myArr = [];
        buy.map(d => myArr.push(d.title))
        newOrder['orderTitle'] = myArr;
        newOrder['totalPrice'] = sum;
        setOrderItem(newOrder);
        fetch('https://limitless-tor-25486.herokuapp.com/order',{
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body : JSON.stringify(newOrder)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    return (
        <div className="w-75 mx-auto mt-5">
            <div style={{ display: 'block' }} className="checkout-section">
            {
                            (buy.length === 0) && <div class="spinner-border text-primary justify-content-center" style={{position: 'relative', left: '550px', top: '180px'}} role="status"><span class="visually-hidden">Loading...</span></div>
                        }
                <h4>Checkout: </h4>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buy.map(productDetail => <tr><td><strong>{productDetail.title}</strong></td><td className="gx-5"><strong>1</strong></td><td><strong>${productDetail.price}</strong></td></tr>)
                        }
                    </tbody>
                    <tfoot>
                        <td><strong>Total</strong></td>
                        <td></td>
                        <td className="gs-5"><strong>${sum}</strong></td>
                    </tfoot>
                </table>
                <div className="text-right">
                    <Link className="btn btn-primary" onClick={handleOrder}>Checkout</Link>
                </div>
            </div>
            <div style={{ display: 'none' }} className="order-section">
                <h2 className="text-center">Order</h2>
                <div className=" d-flex justify-content-center">
                    <form className="w-50">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Name</label>
                            <input type="text" value={loggedInUser.displayName} className="form-control" name="name" placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="text" value={loggedInUser.email} className="form-control" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea3">Address</label>
                            <textarea class="form-control" name="address" id="exampleFormControlTextarea3" rows="5" placeholder="Your Address"></textarea>
                        </div>
                        <p><strong>You order total : ${sum}</strong></p>
                        <div className="text-right">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>confirmOrder(`${sum}`)}>Order</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Team BDGroceryStore</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <p className="text-success">{loggedInUser.displayName}, thanks for your order!!!</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Buy;
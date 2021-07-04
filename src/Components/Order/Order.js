import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';

const Order = () => {
    const [orderedProduct, setOrderedProduct] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    useEffect(() => {
        fetch('https://limitless-tor-25486.herokuapp.com/order/?email='+loggedInUser.email)
            .then(res => res.json())
            .then(data => setOrderedProduct(data))
    }, []);
    // console.log(new Date (orderedProduct[0].date))
    return (

        <div>
            {
                orderedProduct.map(e => {
                        return <div class="shadow mx-auto p-3 my-5 card mb-3" style={{maxWidth: "540px", borderRadius: '5px'}}>
                            <div class="row g-0">
                                <div class="col-md-4 d-flex align-items-center">
                                    <h4 className="text-primary">{new Date(e.date).toDateString()}</h4>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h4 class="card-title text-primary">Your Total Order : ${e.totalPrice}</h4>
                                        {
                                            e.orderTitle.map( title => <p class="card-text mb-0 text-muted"><strong>{title}</strong></p>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
        </div>
    );
};
export default Order;
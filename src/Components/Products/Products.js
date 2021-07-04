import React from 'react';
import { Link } from 'react-router-dom';

const Products = (props) => {
    const { _id, image, title, price } = props.productItem;
    return (
        <div class="card col-md-4 gx-5 m-4 shadow bg-body rounded" style={{width: '20rem',border: 'none'}}>
            <img src={image} class="card-img-top" alt="..." />
            <div class="card-body">
                <h4 class="card-title">{title}</h4>
            </div>
            <div class="card-footer" style={{backgroundColor: 'white', borderTop: 'none'}}>
                <div className="row">
                    <div className="col-6">
                        <h4>${price}</h4>
                    </div>
                    <div className="col-6">
                        <Link to='/buy' onClick={() => props.handleCheckOut(props.productItem)} className="btn btn-primary">BUY NOW</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
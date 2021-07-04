import React, { useEffect, useState } from 'react';
import SideMenu from '../SideMenu/SideMenu';

const ManageProduct = () => {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        fetch('https://limitless-tor-25486.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProductList(data))
    }, [])
    const handleDelete = (id) => {
        fetch(`https://limitless-tor-25486.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    document.getElementById(`${id}`).style.display = 'none';
                }
            })
    }
    return (
        <div className="row w-75 mx-auto mt-3 ms-3">
            {/* <div className="col-md-3">
                <SideMenu></SideMenu>
            </div> */}
            <h4 className="mt-3">Manage Product</h4>
            <div className="col-md-12">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (productList.length === 0) && <div class="spinner-border text-primary justify-content-center" style={{position: 'relative', left: '350px', top: '180px'}} role="status"><span class="visually-hidden">Loading...</span></div>
                        }
                        {
                            productList.map(productDetail => <tr id={`${productDetail._id}`}><td><strong>{productDetail.title}</strong></td><td className="gx-5"><strong>${productDetail.price}</strong></td><td><button className="btn btn-danger" onClick={() => handleDelete(`${productDetail._id}`)}>Delete</button></td></tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProduct;
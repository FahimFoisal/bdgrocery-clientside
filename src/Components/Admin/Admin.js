import React from 'react';
import SideMenu from '../SideMenu/SideMenu';
import AddProduct from '../AddProduct/AddProduct'
import ManageProduct from '../ManageProduct/ManageProduct';

const Admin = () => {
    return (
        <div className="row">
            <div className="col-md-3">
                <SideMenu></SideMenu>
            </div>
            <div className="col-md-9">
                <ManageProduct></ManageProduct>
            </div>
        </div>
    );
};

export default Admin;
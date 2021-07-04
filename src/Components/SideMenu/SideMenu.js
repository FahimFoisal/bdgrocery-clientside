import React from 'react';
import { Link } from 'react-router-dom';
import Div100vh from 'react-div-100vh'

const SideMenu = () => {
    return (
        <Div100vh  style={{borderRight : '1px solid grey'}}>
        <nav class="nav flex-column">
            <Link class="nav-link" to="/manageProduct">Manage Product</Link>
            <Link class="nav-link" to="/addProduct">Add Product</Link>
            <Link class="nav-link" to="/edit">Edit</Link>
        </nav>
        </Div100vh>
    );
};

export default SideMenu;
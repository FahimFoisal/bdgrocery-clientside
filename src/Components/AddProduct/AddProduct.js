import React, { useContext, useEffect, useState } from 'react';
import SideMenu from '../SideMenu/SideMenu';
import { userContext } from '../../App';
import axios from 'axios';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [info, setInfo] = useState({});
    const [file, setFile] = useState({});
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }
    console.log(info)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const imageData = new FormData();
        imageData.set('key', 'c53b5ebcc77291f5fedb4f7ab9134ced');
        const reader = new FileReader();
        reader.onloadend = function () {
            imageData.append('file', reader.result);
            axios.post('https://api.imgbb.com/1/upload/', imageData)
            .then(function (response) {
                console.log(response)
            })
            .then(function (error) {
                console.log(error)
            })
        // console.log(e.target.files[0])
        // axios.post('https://api.imgbb.com/1/upload/', imageData)
        //     .then(function (response) {
        //         console.log(response)
        //     })
        //     .then(function (error) {
        //         console.log(error)
        //     })
            // console.log('RESULT', reader.result)
        }
        // reader.readAsDataURL(file);
        console.log(reader.readAsDataURL(file))
        // const imageData = new FormData();
        // imageData.set('key', 'c53b5ebcc77291f5fedb4f7ab9134ced');
        // imageData.append('file', e.target.files[0]);
        // console.log(e.target.files[0])
        // axios.post('https://api.imgbb.com/1/upload/', imageData)
        //     .then(function (response) {
        //         console.log(response)
        //     })
        //     .then(function (error) {
        //         console.log(error)
        //     })
        // console.log(formData)
        // fetch('https://api.imgbb.com/1/upload/', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        // })
        // .catch(error => {
        //     console.error(error)
        // })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        // formData.append('image', file);
        formData.append('title', info.title);
        formData.append('price', info.price);
        console.log(formData)

        fetch('https://limitless-tor-25486.herokuapp.com/addProduct', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <div className="row">
            <div className="col-md-3">
                <SideMenu></SideMenu>
            </div>
            <div className="col-md-9">
                <div className='justify-content-center w-50 mx-auto'>
                    <h4>Manage Products</h4>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Product Name</label>
                            <input onBlur={handleBlur} type="text" className="form-control" name="title" placeholder="Product Name - Weight" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Price</label>
                            <input onBlur={handleBlur} type="number" className="form-control" name="price" id="exampleInputPassword1" placeholder="Price" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Upload a image</label>
                            <input onChange={handleFileChange} type="file" className="form-control" id="exampleInputPassword1" placeholder="Picture" />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Orders;
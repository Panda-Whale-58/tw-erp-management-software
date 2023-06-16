import React, { useState, ChangeEvent, useEffect, } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { func } from 'prop-types';




const Feed = () => {
    const [product, setProduct] = useState('none');
    const [productInfo, setProductInfo] = useState({});
    const [user, setUser] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    // //example of useLocation
    // // const { state } = useLocation();
    // // const { id, color } = state; // Read values passed on state
    const navigate = useNavigate();
    // console.log(state)
    // const location = useLocation();
    // console.log('location', location)
    // const { id } = location.state;
    // // console.log(id)

    useEffect(() => {
        // console.log('useeffect in feed', location.state.userdata)
        // if (location.state.userdata) {
        //     setUser(location.state.userdata);
        // }
        const usernameromstorage = localStorage.getItem('username');
        console.log('usernameromstorage', usernameromstorage)
        setUser({username: usernameromstorage})
    }, [])


    const handleChange = (event) => {
        setProduct(event.target.value);
    };

    useEffect(() => {
        console.log('user in other', user)
        // console.log('color', color)
        // console.log('username in feed useeffect', username)
        async function fetchBike() {
            try {
                if (product === 'none') {
                    return;
                }
                const body = {
                    "itemName": `${product}`,
                    "quantity": 1,
                }
                const bike = await fetch('/db/quote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                }).then(ans => ans.json())

                console.log('bike', bike)
                // {cost: 948, shipTime: 9, price: 1422}
                setProductInfo(bike)
            } catch (error) {
                console.log('there was an error in fetch bike');
            }
        }
        fetchBike();
    }, [product])

    console.log('user in global', user);

    function signOut () {
        localStorage.setItem('username', 'signed out');
        navigate('/');
    }

    function buyNow() {
        setShowConfirmation(true)
        // setTimeout(() => {
        //     setShowConfirmation(false);
        // }, 5000)
    }

    function cancelNotification() {
        setShowConfirmation(false);
    }

    return (
        <>
            <nav>
                <div className='nav-container'>
                    <div className="nav-unit">
                        <h1>TW-ERP Bikes</h1>
                    </div>
                    <div className="nav-unit">
                    {/* <button onClick={signOut}>Sign Out</button> */}
                    <a onClick={signOut}>Sign Out</a>
                    <h3>{user.username}</h3>
                    </div>
                </div>

            </nav>

            <Box sx={{ minWidth: 120 }}>
                {/* <div className="drop-down-container"> */}
                <FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Products</InputLabel> */}
                    <Select onChange={handleChange} sx={{ m: 1, width: 350, mt: 3 }} id='drop-down-menu' value={product} style={{ marginTop: 35, backgroundColor: 'white' }}>
                        <MenuItem value='none' disabled>Select a product</MenuItem>
                        <MenuItem value={'TW-ERP Bike'}>TW-ERP Bike</MenuItem>
                        <MenuItem value={'Bad Bike'}>Bad Bike</MenuItem>
                        <MenuItem value={'Rad Bike 2.0'}>Rad Bike 2.0</MenuItem>
                        <MenuItem value={'Mountain Mayhem Bike'}>Mountain Mayhem Bike</MenuItem>
                        <MenuItem value={'BMXcellence'}>BMXcellence</MenuItem>
                        <MenuItem value={'Not Your Father\'s Nike'}>Not Your Father's Bike</MenuItem>
                        <MenuItem value={'Tandem Terror'}>Tandem Terror</MenuItem>
                        <MenuItem value={'Tricycle'}>Tricycle</MenuItem>
                    </Select>
                </FormControl>
                {/* </div> */}
            </Box>



            {Object.keys(productInfo).length != 0 && (
                Object.hasOwn(productInfo, 'cost') ? (
                    <div className="outer-container">
                        <div className='main-display-container'>
                            <img id='bike-image' src='https://cdn.shopify.com/s/files/1/0153/0623/products/MH-1029-02_1800x1800.jpg?v=1681762882'></img>
                            <div className="display-details">
                                <div className="detail-entry">
                                    <h3>{product}</h3>
                                </div>
                                <div className="detail-entry">
                                    <h3>Cost: ${productInfo.cost}</h3>
                                </div>
                                <div className="detail-entry">
                                    <h3>Estimated delivery: {productInfo.shipTime} days</h3>
                                </div>
                            </div>
                            <button onClick={buyNow} className='buy-now-button'>Buy now!</button>
                            {showConfirmation && (
                                <div className="order-confirmation">
                                    <p>You order has been received and will be delievered in {productInfo.shipTime} days!</p>
                                    <button onClick={cancelNotification} className='cancel-notification'>X</button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                    {/* <div> */}
                        {/* Sold Out */}
                        <div className="sold-out-container">
                            <div className="main-sold-out-container">
                                <img id='sold-out-image' src='https://thumbs.dreamstime.com/b/young-handsome-man-wearing-bike-helmet-sad-expression-covering-face-hands-crying-depression-concept-226263594.jpg'></img>
                                <div className="sold-out-details">
                                    <p>Our sincerest apologies, the <span className='italics'>{product}</span> is sold out. Perhaps you would be interested in our flagship <strong>TW-ERP Bike?</strong></p>
                                </div>
                            </div>
                        </div>
                        {/* <img id='bike-image' src='https://cdn.shopify.com/s/files/1/0153/0623/products/MH-1029-02_1800x1800.jpg?v=1681762882'></img> */}
                    {/* </div> */}
                    </>
                )
            )}
            
        </>
    )
}
export default Feed;
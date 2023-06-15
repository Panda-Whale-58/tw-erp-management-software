import React, { useState, ChangeEvent, useEffect, } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLocation } from 'react-router-dom';




const Feed = () => {
    const [product, setProduct] = useState('none');
    const [productInfo, setProductInfo] = useState({});
    const [user, setUser] = useState('');
    // //example of useLocation
    // // const { state } = useLocation();
    // // const { id, color } = state; // Read values passed on state

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

    return (
        <>
            <nav>
                <div className='nav-container'>
                    <h1>Twerp Bikes</h1>
                    {user.username}
                </div>

            </nav>

            <Box sx={{ minWidth: 120 }}>
                {/* <div className="drop-down-container"> */}
                <FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Products</InputLabel> */}
                    <Select onChange={handleChange} sx={{ m: 1, width: 350, mt: 3 }} id='drop-down-menu' value={product} style={{ marginTop: 100, backgroundColor: 'white' }}>
                        <MenuItem value='none' disabled>Select a product</MenuItem>
                        <MenuItem value={'TW-ERP Bike'}>Bike</MenuItem>
                        <MenuItem value={'Bad Bike'}>Bad Bike</MenuItem>
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
                        </div>
                    </div>
                ) : (
                    <div>
                        Sold Out
                        {/* <img id='bike-image' src='https://cdn.shopify.com/s/files/1/0153/0623/products/MH-1029-02_1800x1800.jpg?v=1681762882'></img> */}
                    </div>
                )
            )}
        </>
    )
}
export default Feed;
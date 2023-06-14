import React, {useState, ChangeEvent, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const Feed = ({username}) => {
    const [product, setProduct] = React.useState('none');

    const handleChange = (event) => {
        setProduct(event.target.value);
    };

    const [productInfo, setProductInfo] = useState({});

    useEffect (() => {
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
} catch(error) {
    console.log('there was an error in fetch bike');
}   
}
fetchBike();
    }, [product])
    
    return(
        <>        
        <nav>
        {username}
         </nav>
         <h1>Twerp Bikes</h1>
    <Box sx={{ minWidth: 120 }}>
         {/* <div className="drop-down-container"> */}
        <FormControl>
        {/* <InputLabel id="demo-simple-select-label">Products</InputLabel> */}
        <Select onChange={handleChange}  sx={{ m: 1, width: 350, mt: 3 }} id='drop-down-menu' value={product} style={{ marginTop: 100}}>
            <MenuItem value='none' disabled>Select a product</MenuItem>
            <MenuItem value={'TW-ERP Bike'}>Bike</MenuItem>
            <MenuItem value={'Bad Bike'}>Bad Bike</MenuItem>
        </Select>
    </FormControl>
    {/* </div> */}
    </Box>

<div className="outer-container">
    <div className='main-display-container'>
        <img id='bike-image' src='https://cdn.shopify.com/s/files/1/0153/0623/products/MH-1029-02_1800x1800.jpg?v=1681762882'></img>

        <div className="display-details">
            <div className="detail-entry">
                <h3>Awesome Bike</h3>
            </div>
            <div className="detail-entry">
                <h3>$1000</h3>
            </div>
            <div className="detail-entry">
                <h3>Estimated delivery: 1 week</h3>
            </div>
        </div>
    </div>
    </div>


        </>
    )
}
export default Feed;
const fetch = require('node-fetch');

async function checkProducts() {
    try {
        const response = await fetch('https://xzanzkz0wl.execute-api.ap-south-1.amazonaws.com/api/e3/rides', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Rides response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Fetch failed:', error);
    }
}

checkProducts();

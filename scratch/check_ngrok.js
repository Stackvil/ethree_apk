const fetch = require('node-fetch');

async function checkApi() {
    try {
        const response = await fetch('https://swampland-situated-barbell.ngrok-free.dev/api/e3/rides');
        const data = await response.json();
        console.log('Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Fetch failed:', error);
    }
}

checkApi();

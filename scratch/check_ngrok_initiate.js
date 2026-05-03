const fetch = require('node-fetch');

async function checkApi() {
    try {
        const response = await fetch('https://swampland-situated-barbell.ngrok-free.dev/api/payments/initiate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: "100.00",
                txnid: "TEST",
                phone: "9999999999",
                productinfo: "Test",
                firstname: "Test",
                email: "test@example.com"
            })
        });
        const data = await response.json();
        console.log('Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Fetch failed:', error);
    }
}

checkApi();

const fetch = require('node-fetch');

async function checkProfile() {
    try {
        // We don't have a token here, but maybe we can see the structure if it fails with 401
        const response = await fetch('https://xzanzkz0wl.execute-api.ap-south-1.amazonaws.com/api/profile', {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Profile response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Fetch failed:', error);
    }
}

checkProfile();

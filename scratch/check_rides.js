const https = require('https');

https.get('https://xzanzkz0wl.execute-api.ap-south-1.amazonaws.com/api/e3/rides', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            console.log(JSON.stringify(JSON.parse(data), null, 2));
        } catch (e) {
            console.log(data);
        }
    });
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});

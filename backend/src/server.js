console.log('Loading dotenv...');
require('dotenv').config();
console.log('Loading app...');
const app = require('./app');
console.log('Loading connectDB...');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5001;

console.log('Initiating DB connection...');
connectDB().then(() => {
    console.log('DB connection process initiated...');
}).catch(err => {
    console.error('DB connection error:', err);
});

console.log('Attempting to listen on port', PORT);
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

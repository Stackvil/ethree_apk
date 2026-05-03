const morgan = require('morgan');
console.log('morgan loaded');
const express = require('express');
console.log('express loaded');
const cors = require('cors');
console.log('cors loaded');
const helmet = require('helmet');
console.log('helmet loaded');
// const swaggerUi = require('swagger-ui-express');
// console.log('swaggerUi loaded');
// const swaggerJsdoc = require('swagger-jsdoc');
// console.log('swaggerJsdoc loaded');
const path = require('path');
console.log('path loaded');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Swagger Config
/*
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ETHREE API',
            version: '1.0.0',
            description: 'API Documentation for ETHREE App',
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? 'https://your-production-url.vercel.app'
                    : 'http://localhost:5001',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [path.join(__dirname, './routes/*.js'), path.join(__dirname, './models/*.js')],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
*/

// Routes
console.log('Loading auth routes...');
app.use('/auth', require('./routes/authRoutes'));
console.log('Loading ride routes...');
app.use('/rides', require('./routes/rideRoutes'));
console.log('Loading restaurants routes...');
app.use('/restaurants', require('./routes/diningRoutes'));
console.log('Loading events routes...');
app.use('/events', require('./routes/eventRoutes'));
console.log('Loading booking routes...');
app.use('/', require('./routes/bookingRoutes')); // Includes /bookings and /payments/demo
console.log('Loading users routes...');
app.use('/users', require('./routes/userRoutes'));
console.log('Loading meta routes...');
app.use('/meta', require('./routes/metaRoutes'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to ETHREE API' });
});

module.exports = app;

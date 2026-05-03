require('dotenv').config();
const mongoose = require('mongoose');
const Ride = require('../models/Ride');
const Restaurant = require('../models/Restaurant');
const EventType = require('../models/EventType');

const rides = [
    { name: 'Roller Coaster', price: '₹150', description: 'Thrilling high-speed ride', isActive: true },
    { name: 'Ferris Wheel', price: '₹100', description: 'Classic panoramic views', isActive: true },
    { name: 'Carousel', price: '₹50', description: 'Fun for all ages', isActive: true },
];

const restaurants = [
    { name: 'The Golden Leaf', description: 'Fine dining experience', isActive: true },
    { name: 'Spice Haven', description: 'Authentic local cuisine', isActive: true },
];

const events = [
    { title: 'Live Music', isActive: true },
    { title: 'Corporate Event', isActive: true },
    { title: 'Birthday Party', isActive: true },
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Clearing old data...');
        await Ride.deleteMany();
        await Restaurant.deleteMany();
        await EventType.deleteMany();

        console.log('Seeding new data...');
        await Ride.insertMany(rides);
        await Restaurant.insertMany(restaurants);
        await EventType.insertMany(events);

        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();

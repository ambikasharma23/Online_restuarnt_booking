const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development'; // Default to 'development' if NODE_ENV is not set
const config = require('./config/config.json')[env]; // Accessing the configuration for the development environment

// Initialize Sequelize with your configuration
const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect,
  host: config.host,
  port: config.port // Add port if needed
});

// Import the Slot model
const Slot = require('./models/slots')(sequelize, Sequelize.DataTypes);

// Function to generate slots for a restaurant
async function generateSlotsForRestaurant(restaurantId) {
    const slots = [];
    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0); // Set start time to 9:00 AM

    const endTime = new Date();
    endTime.setHours(19, 0, 0, 0); // Set end time to 7:00 PM

    const slotDuration = 30 * 60 * 1000; // Slot duration is 30 minutes in milliseconds

    let currentTime = startTime;

    while (currentTime < endTime) {
        const slot = {
            restaurant_id: restaurantId,
            start_time: currentTime,
            end_time: new Date(currentTime.getTime() + slotDuration),
            capacity: 10, // Adjust the capacity as needed
            created_at: new Date(),
            updated_at: new Date()
        };
        slots.push(slot);
        currentTime = new Date(currentTime.getTime() + slotDuration);
    }

    return slots;
}

// Function to insert slots for all restaurants
async function insertSlotsForAllRestaurants() {
    const restaurantIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Assuming restaurant IDs start from 1 and go up to 9

    try {
        for (const restaurantId of restaurantIds) {
            const slots = await generateSlotsForRestaurant(restaurantId);
            await Slot.bulkCreate(slots);
        }
        console.log('Slots inserted successfully.');
    } catch (error) {
        console.error('Error inserting slots:', error);
    }
}

// Call the function to insert slots for all restaurants
insertSlotsForAllRestaurants();

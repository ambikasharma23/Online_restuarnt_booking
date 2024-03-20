// const asyncHandler = require('express-async-handler');
// const {  sequelize,Restaurants, Inventory ,Slot} = require('../models');  // Assuming your model is exported as Restaurants
// const { Op } = require('sequelize');
// const restaurantsController = {
//   selectAll: asyncHandler(async (req, res) => {
//     try {
//         const { search, page = 1, pageSize = 10 } = req.query;

//         // Initialize where clause
//         let whereClause = {};

//         // Construct the where clause based on the search parameter
//         if (search) {
//             whereClause = {
//                 [Op.or]: [
//                   { cuisine_type: { [Op.substring]: search } },
//                     { location: { [Op.substring]: search } }
                    
//                 ]
//             };
//         }

//         // Find restaurants matching the where clause
//         let restaurants;
//         if (search) {
//             restaurants = await Restaurants.findAll({
//                 where: whereClause,
//             });
//         } else {
//             // Calculate offset for pagination
//             const offset = (page - 1) * parseInt(pageSize);
            
//             // Find restaurants matching the where clause, with pagination
//             const result = await Restaurants.findAndCountAll({
//                 where: whereClause,
//                 limit: parseInt(pageSize),
//                 offset: offset,
//             });
//             restaurants = result.rows;
//         }

//         // Send only the restaurants array as the response
//         res.send(restaurants || []); // Ensure restaurants is always an array
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error'); // Send plain text response
//     }
// }),







//   insert: asyncHandler(async (req, res) => {
//     try {
//       const { name, image, location, cuisine_type } = req.body;

//       // Create a new restaurant
//       const newRestaurant = await Restaurants.create({
//         name,
//         image,
//         location,
//         cuisine_type,
//       });

//       res.status(201).json({ message: 'Insert successful', restaurant: newRestaurant });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error during insertion' });
//     }
//   }),

//   byId: asyncHandler(async (req, res) => {
//     try {
//       const { id } = req.params; // Extract the ID from the URL path parameters
  
//       const restaurant = await Restaurants.findByPk(id);
  
//       if (!restaurant) {
//         return res.status(404).json({ error: 'Restaurant not found' });
//       }
  
//       res.status(200).json(restaurant);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error retrieving restaurant by ID' });
//     }
//   }),
//   getRestaurantData: asyncHandler(async (req, res) => {
//     try {
//       const restaurantId = req.params.restaurant_id;
  
//       // Fetch restaurant details
//       const restaurant = await Restaurants.findByPk(restaurantId, {
//         attributes: ['id', 'name', 'image', 'location', 'cuisine_type'] // Include restaurant details
//       });
  
//       // Retrieve all inventories associated with the provided restaurant_id
//       const inventories = await Inventory.findAll({
//         where: {
//           restaurant_id: restaurantId
//         }
//       });
  
//       // Object to store slots grouped by date
//       const slotByDate = {};
  
//       // Iterate over each inventory
//       for (const inventory of inventories) {
//         // Check if quantity is greater than 0
//         if (inventory.quantity > 0) {
//           // Retrieve associated slot information
//           const slot = await Slot.findOne({
//             where: {
//               id: inventory.slot_id
//             },
//             attributes: ['id', 'start_time'] // Only include id and start_time
//           });
  
//           // If slot with quantity > 0 is found, add it to the slotByDate object
//           if (slot) {
//             const date = inventory.date.toISOString().split('T')[0]; // Assuming inventory contains the date attribute
//             if (!slotByDate[date]) {
//               slotByDate[date] = [];
//             }
//             slotByDate[date].push({
//               slot_id: slot.id,
//               start_time: slot.start_time
//             });
//           }
//         }
//       }
  
//       // Format the response data to include restaurant details, date, and associated slots
//       const responseData = {
//         restaurant: restaurant, // Include restaurant details
//         slots_by_date: Object.keys(slotByDate).map(date => ({
//           date: date,
//           slots: slotByDate[date]
//         }))
//       };
  
//       res.json(responseData);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   })
  
  
  
// };
// module.exports = restaurantsController;




const asyncHandler = require('express-async-handler');
const { sequelize, Restaurants, Inventory, Slot } = require('../models');
const { Op } = require('sequelize');

const restaurantsController = {
  selectAll: asyncHandler(async (req, res) => {
    try {
      const { search, page = 1, pageSize = 10 } = req.query;

      // Initialize where clause
      let whereClause = {};

      // Construct the where clause based on the search parameter
      if (search) {
        whereClause = {
          [Op.or]: [
            { cuisine_type: { [Op.substring]: search } },
            { location: { [Op.substring]: search } },
          ],
        };
      }

      // Find restaurants matching the where clause
      let restaurants;
      if (search) {
        restaurants = await Restaurants.findAll({
          where: whereClause,
        });
      } else {
        // Calculate offset for pagination
        const offset = (page - 1) * parseInt(pageSize);

        // Find restaurants matching the where clause, with pagination
        const result = await Restaurants.findAndCountAll({
          where: whereClause,
          limit: parseInt(pageSize),
          offset: offset,
        });
        restaurants = result.rows;
      }

      // Send only the restaurants array as the response
      res.send(restaurants || []); // Ensure restaurants is always an array
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }),

  insert: asyncHandler(async (req, res) => {
    try {
      const { name, image, location, cuisine_type } = req.body;

      // Create a new restaurant
      const newRestaurant = await Restaurants.create({
        name,
        image,
        location,
        cuisine_type,
      });

      res.status(201).json({ message: 'Insert successful', restaurant: newRestaurant });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error during insertion' });
    }
  }),

  byId: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params; // Extract the ID from the URL path parameters

      const restaurant = await Restaurants.findByPk(id);

      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }

      res.status(200).json(restaurant);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving restaurant by ID' });
    }
  }),

  getAvailableDates: asyncHandler(async (req, res) => {
    try {
      const { restaurant_id } = req.params;

      // Retrieve distinct dates from inventories associated with the provided restaurant_id
      const dates = await Inventory.findAll({
        where: {
          restaurant_id,
          quantity: {
            [Op.gt]: 0,
          },
        },
        attributes: [
          [sequelize.fn('DISTINCT', sequelize.col('date')), 'date'],
        ],
      });

      const availableDates = dates.map((inventory) =>
        inventory.get('date').toISOString().split('T')[0]
      );

      res.json(availableDates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }),

  getSlotsByDate: asyncHandler(async (req, res) => {
    try {
      const { restaurant_id, selectedDate } = req.params;

      // Retrieve all inventories associated with the provided restaurant_id and date
      const inventories = await Inventory.findAll({
        where: {
          restaurant_id,
          date: {
            [Op.between]: [`${selectedDate} 00:00:00`, `${selectedDate} 23:59:59`],
          },
          quantity: {
            [Op.gt]: 0,
          },
        },
      });

      const slotByDate = {};

      // Iterate over each inventory
      for (const inventory of inventories) {
        const slot = await Slot.findOne({
          where: {
            id: inventory.slot_id,
          },
          attributes: ['id', 'start_time'],
        });

        if (slot) {
          if (!slotByDate[selectedDate]) {
            slotByDate[selectedDate] = [];
          }
          slotByDate[selectedDate].push({
            slot_id: slot.id,
            start_time: slot.start_time,
          });
        }
      }

      res.json({ slots: slotByDate[selectedDate] || [] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }),

  getRestaurantData: asyncHandler(async (req, res) => {
    try {
      const restaurantId = req.params.restaurant_id;

      // Fetch restaurant details
      const restaurant = await Restaurants.findByPk(restaurantId, {
        attributes: ['id', 'name', 'image', 'location', 'cuisine_type'],
      });

      res.json({ restaurant }); // Only return restaurant details
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }),
};

module.exports = restaurantsController;




// const { Inventory, Slot } = require('../models');

// const createInventoriesForNext5Days = async (req, res) => {
//   try {
//     const { restaurant_id } = req.params;

//     // Find all slots for the given restaurant
//     const restaurantSlots = await Slot.findAll({
//       where: {
//         restaurant_id,
//       },
//     });

//     if (!restaurantSlots || restaurantSlots.length === 0) {
//       return res.status(404).json({ error: 'No slots found for the restaurant' });
//     }

//     // Calculate dates for the next 5 days
//     const currentDate = new Date();
//     const dates = [];
//     for (let i = 0; i < 5; i++) {
//       const nextDate = new Date(currentDate);
//       nextDate.setDate(currentDate.getDate() + i);
//       dates.push(nextDate.toISOString().split('T')[0]);
//     }

//     // Generate inventories for each slot and date
//     const inventories = [];

//     // Use Promise.all to await all promises in the loop
//     await Promise.all(
//       restaurantSlots.map(async (slot) => {
//         await Promise.all(
//           dates.map(async (date) => {
//             // Check if an entry already exists for the restaurant, slot, and date
//             const existingEntry = await Inventory.findOne({
//               where: {
//                 restaurant_id,
//                 slot_id: slot.id,
//                 date,
//               },
//             });

//             if (!existingEntry) {
//               // If entry does not exist, create a new one
//               const newEntry = await Inventory.create({
//                 restaurant_id,
//                 slot_id: slot.id,
//                 quantity: slot.capacity,
//                 date,
//               });

//               if (newEntry.quantity < 0) {
//                 console.error('Error: Quantity is negative after creation.');
//                 return res.status(500).json({ error: 'Negative quantity error' });
//               }

//               inventories.push(newEntry);
//             }
//             // If entry already exists, do nothing
//           })
//         );
//       })  
//     );

//     res.status(201).json(inventories);
//   } catch (error) {
//     console.error('Error creating inventories:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = {
//   createInventoriesForNext5Days,
// };
///////////////////////////////////////////////////////////////////////////////////////////////////
// const moment = require('moment');

// const { Inventory, Slot } = require('../models');

// const createInventoriesForNext5Days = async (req, res) => {
//   try {
//     const { restaurant_id } = req.params;

//     const restaurantSlots = await Slot.findAll({
//       where: {
//         restaurant_id,
//       },
//     });

//     if (!restaurantSlots || restaurantSlots.length === 0) {
//       return res.status(404).json({ error: 'No slots found for the restaurant' });
//     }

//     const currentDate = String(moment().format("YYYY-MM-DD"));
//     console.log({
//       currentDate:currentDate
//     });
//     const dates = [];
//     dates.push(currentDate);
//     let cur = currentDate;
//     for (let i = 0; i < 4; i++) {
//       let nextDate = moment(cur, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD");
//       dates.push(nextDate);
//       cur = nextDate;

//     }

//     console.log(dates)

//     const inventories = [];

//     for (const slot of restaurantSlots) {
//       for (const date of dates) {
//         console.log({
//           date: date
//         });
//         // Check
//         const existingEntry = await Inventory.findOne({
//           where: {
//             restaurant_id:restaurant_id,
//             slot_id:slot.id,
//             date: date
//           },
//         });

//         if (existingEntry) {
//           // If entry already exists, do nothing
//           console.log('Entry already exists:', existingEntry.toJSON());
//         } else {
//           // If entry does not exist, create it
//           const newEntry = await Inventory.create({
//             restaurant_id,
//             slot_id: slot.id,
//             quantity: slot.capacity,
//             date
//           });

//           const t = newEntry.toJSON()
//           //console.log(t.date)

//           inventories.push(newEntry);

//           if (newEntry.quantity < 0) {
//             console.error('Error: Quantity is negative after creation.');
//             return res.status(500).json({ error: 'Negative quantity error' });
//           }
//         }
//       }
//     }

//     res.status(201).json(inventories);
//   } catch (error) {
//     console.error('Error creating inventories:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = {
//   createInventoriesForNext5Days,
// };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const moment = require('moment-timezone'); // Use moment-timezone instead of moment
const { Inventory, Slot, sequelize } = require('../models');

const createInventoriesForNext5Days = async (req, res) => {
  const t = await sequelize.transaction(); // Start a transaction

  try {
    const { restaurant_id } = req.params;

    const restaurantSlots = await Slot.findAll({
      where: {
        restaurant_id,
      },
    });

    if (!restaurantSlots || restaurantSlots.length === 0) {
      return res.status(404).json({ error: 'No slots found for the restaurant' });
    }

    const currentDate = moment().tz('Asia/Kolkata').format("YYYY-MM-DD"); 
    const dates = [currentDate, ...Array.from({ length: 4 }, (_, i) =>
      moment(currentDate, "YYYY-MM-DD").add(i + 1, "days").format("YYYY-MM-DD")
    )];

    const inventories = [];

    for (const slot of restaurantSlots) {
      for (const date of dates) {
        const existingEntry = await Inventory.findOne({
          where: {
            restaurant_id,
            slot_id: slot.id,
            date: sequelize.literal(`DATE(date) = '${date}'`), 
          },
          transaction: t,
        });

        if (existingEntry) {
          console.log('Entry already exists:', existingEntry.toJSON());
        } else {
          const newEntry = await Inventory.create({
            restaurant_id,
            slot_id: slot.id,
            quantity: slot.capacity,
            date,
          }, { transaction: t });

          inventories.push(newEntry);

          if (newEntry.quantity < 0) {
            console.error('Error: Quantity is negative after creation.');
            await t.rollback(); // Rollback the transaction
            return res.status(500).json({ error: 'Negative quantity error' });
          }
        }
      }
    }

    await t.commit(); // Commit the transaction

    res.status(201).json(inventories);
  } catch (error) {
    console.error('Error creating inventories:', error);
    await t.rollback(); // Rollback the transaction in case of an error
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createInventoriesForNext5Days,
};

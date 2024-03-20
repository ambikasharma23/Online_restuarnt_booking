const cron = require('node-cron');
const { Op } = require('sequelize');
const { Inventory } = require('../models');

// Define a cron job that runs every 10 seconds
const job = cron.schedule('30 * * * *', async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    // Delete entries from the inventories table where the date is before today
    await Inventory.destroy({
      where: {
        date: {
          [Op.lt]: today,
        },
      },
    });

    console.log('Cron job executed: Deleted entries from inventories for dates before today.');
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});

// Start the cron job
job.start();
module.exports = job;

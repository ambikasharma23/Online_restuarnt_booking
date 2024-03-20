const moment = require('moment-timezone');
const { Booking, Slot, Inventory } = require('../models');

const createBooking = async (req, res) => {
  try {
    const {
      slot_id,
      customer_id,
      customer_name, 
      num_guests,
      contact_number,
      booking_date
    } = req.body;

    // Validate booking date
    const today = moment().tz('Asia/Kolkata').startOf('day');
    const bookingDateObj = moment.tz(booking_date, 'YYYY-MM-DD HH:mm:ss', 'Asia/Kolkata');

    if (bookingDateObj.isBefore(today)) {
      return res.status(400).json({ error: 'Booking date cannot be before today' });
    }

    const booking = await Booking.create({
      slot_id,
      customer_id,
      customer_name,
      contact_number,
      num_guests,
      booking_date,
    });

    const slot = await Slot.findByPk(booking.slot_id);

    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }


    // Update quantity in the inventories table
    const inventory = await Inventory.findOne({
      where: {
        restaurant_id: slot.restaurant_id,
        slot_id: booking.slot_id,
        date: booking.booking_date,
      },
    });

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }
    
    const updatedQuantity = inventory.quantity - num_guests;

    if (updatedQuantity < 0) {
      return res.status(400).json({ error: 'Inventory quantity cannot be negative' });
    }

    await inventory.update({ quantity: updatedQuantity });

    console.log(booking.toJSON());

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createBooking };

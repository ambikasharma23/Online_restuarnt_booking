// getBookController.test.js

const { getBookController } = require('../controllers/getBookController');
const { Booking, Slot, Restaurants } = require('../models');

jest.mock('../models', () => ({
  Booking: {
    findAll: jest.fn(),
  },
  Slot: {
    findByPk: jest.fn(),
  },
  Restaurants: {
    findByPk: jest.fn(),
  },
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('getBookController', () => {
  it('should return the correct response when bookings are found', async () => {
    const mockBookings = [
      {
        id: 1,
        slot_id: 101,
        booking_date: '2024-02-09',
        num_guests: 2,
      },
    ];

    const mockSlot = {
      restaurant_id: 201,
      start_time: '18:00',
      Restaurant: {
        name: 'Mock Restaurant',
      },
    };

    Booking.findAll.mockResolvedValueOnce(mockBookings);
    Slot.findByPk.mockResolvedValueOnce(mockSlot);

    const mockReq = { params: { customer_id: '123' } };
    const mockRes = mockResponse();

    await getBookController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      bookings: [
        {
          booking_id: 1,
          slot_id: 101,
          booking_date: '2024-02-09',
          num_guests: 2,
          restaurant_id: 201,
          restaurant_name: 'Mock Restaurant',
          start_time: '18:00',
        },
      ],
    });
  });

  it('should return a 404 status when no bookings are found', async () => {
    Booking.findAll.mockResolvedValueOnce([]);

    const mockReq = { params: { customer_id: '123' } };
    const mockRes = mockResponse();

    await getBookController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'No bookings found for the specified customer' });
  });

  it('should return a 400 status when an invalid customer ID is provided', async () => {
    const mockReq = { params: { customer_id: '' } };
    const mockRes = mockResponse();

    await getBookController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Customer ID is required' });
  });

  it('should return a 500 status in case of an internal server error', async () => {
    Booking.findAll.mockRejectedValueOnce(new Error('Database error'));

    const mockReq = { params: { customer_id: '123' } };
    const mockRes = mockResponse();

    await getBookController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});

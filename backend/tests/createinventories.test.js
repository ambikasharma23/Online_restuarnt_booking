const moment = require('moment');
const { createInventoriesForNext5Days } = require('../controllers/inventoriescontroller');
const { Inventory, Slot } = require('../models');

test('should create inventories for the next 5 days', async () => {
  // Mocking the request parameters
  const mockReq = {
    params: {
      restaurant_id: '123', // Replace with the correct restaurant_id
    },
  };

  // Mocking the response object
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // Calling the controller function
  await createInventoriesForNext5Days(mockReq, mockRes);

  // Update the test expectation to check for properties instead of comparing entire objects
  expect(mockRes.status).toHaveBeenCalledWith(201);
  expect(mockRes.json).toHaveBeenCalledWith(
    expect.arrayContaining([
      expect.objectContaining({ restaurant_id: '123', slot_id: expect.any(Number), quantity: expect.any(Number), date: '2024-02-09' }),
      expect.objectContaining({ restaurant_id: '123', slot_id: expect.any(Number), quantity: expect.any(Number), date: '2024-02-10' }),
      expect.objectContaining({ restaurant_id: '123', slot_id: expect.any(Number), quantity: expect.any(Number), date: '2024-02-11' }),
      expect.objectContaining({ restaurant_id: '123', slot_id: expect.any(Number), quantity: expect.any(Number), date: '2024-02-12' }),
      expect.objectContaining({ restaurant_id: '123', slot_id: expect.any(Number), quantity: expect.any(Number), date: '2024-02-13' }),
    ])
  );
});

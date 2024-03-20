'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants', [
      {
        id: 1,
        name: 'Rasoi- The Food Express',
        image: 'https://assets.vogue.com/photos/6352ccb841ea2bd565be085f/master/w_2560%2Cc_limit/GettyImages-1223580360.jpg',
        location: '163 Hanuman Mandir Marg Near Hanuman Mandir',
        cuisine_type: 'Indian',
        created_at: new Date('2024-01-25 05:11:45'),
        updated_at: new Date('2024-01-25 05:11:45'),
      },
      {
        id: 2,
        name: 'The Brew Bar',
        image: 'https://www.beanscenemag.com.au/wp-content/uploads/2018/09/bs-brewbar-lrg.jpg',
        location: 'Phase III, Udyog Vihar',
        cuisine_type: 'Italian',
        created_at: new Date('2024-01-25 05:15:38'),
        // updated_at: new Date('2024-01-25 05:15:38'),
      },
      {
        id: 3,
        name: 'D N Snacks',
        image: 'https://img.freepik.com/free-photo/top-view-arrangement-with-food-wooden-background_23-2148308806.jpg',
        location: 'Huda Market Behind Om Sweets',
        cuisine_type: 'Fast Food',
        created_at: new Date('2024-01-25 05:17:27'),
        // updated_at: new Date('2024-01-25 05:17:27'),
      },
      {
        id: 4,
        name: 'Delicious Bistro',
        image: 'https://img.freepik.com/premium-photo/photo-closeup-shot-delicious-food_829042-89.jpg', // Assuming this is a local image path
        location: 'Downtown',
        cuisine_type: 'French',
         created_at: new Date('2024-01-25 05:19:27'),
        // updated_at: new Date('2024-01-25 05:19:27'),
      },
      {
        id: 5,
        name: 'China Club',
        image: 'https://wallpapers.com/images/hd/chinese-food-pictures-n0y85eb3fm4eyazo.jpg',
        location: 'Global Business Park',
        cuisine_type: 'Chinese',
        created_at: new Date('2024-01-25 05:21:27'),
        // updated_at: new Date('2024-01-25 05:21:27'),
      },
      {
        id: 6,
        name: 'Barbeque Nation',
        image: 'https://things2.do/blogs/wp-content/uploads/2022/07/DSC08396-1.jpg',
        location: 'Cyber Hub',
        cuisine_type: 'Continental',
         created_at: new Date('2024-01-25 05:23:27'),
        // updated_at: new Date('2024-01-25 05:23:27'),
      },
      {
        id: 7,
        name: 'Dominos',
        image: 'https://c1.wallpaperflare.com/preview/765/211/654/pizza-pizza-hut-cooking-kitchen.jpg',
        location: 'Pashchim Vihaar',
        cuisine_type: 'Italian',
         created_at: new Date('2024-01-25 05:25:27'),
        // updated_at: new Date('2024-01-25 05:25:27'),
      },
      {
        id: 8,
        name: 'Taco Bell',
        image: 'https://img.freepik.com/free-photo/fresh-beef-taco-wooden-table-with-sauce-generative-ai_188544-8042.jpg',
        location: 'DLF phase 3',
        cuisine_type: 'Mexican',
        created_at: new Date('2024-01-25 05:27:27'),
        // updated_at: new Date('2024-01-25 05:27:27'),
      },
      {
        id: 9,
        name: 'Chaayos',
        image: 'https://imgmedia.lbb.in/media/2018/09/5ba4b22f711da827df1c7f4f_1537520175344.jpg',
        location: 'Sector 29',
        cuisine_type: 'Indian',
         created_at: new Date('2024-01-25 05:29:27'),
        // updated_at: new Date('2024-01-25 05:29:27'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all data from the Restaurants table
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};

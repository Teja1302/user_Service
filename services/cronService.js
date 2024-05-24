const cron = require('node-cron');
const axios = require('axios');
const User = require('../model/userModel');
require('dotenv').config();
const { sendEmail } = require('./emailService');

cron.schedule('0 22 * * *', async () => {
  try {
    const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/products/getlowStocks`);
    const lowStockProducts = response.data;
    
    const admins = await User.findAll({
        where: { role: 'ADMIN' }
      });

    admins.forEach(admin => {
      sendEmail(admin.email, 'Low Stock Alert', JSON.stringify(lowStockProducts, null, 2));
    });
  } catch (error) {
    console.error('Error during cron job:', error);
  }
});

exports.start = () => {

};
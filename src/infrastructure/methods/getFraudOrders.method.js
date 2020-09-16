'use strict';

const buildContext = require('./../config/context');
const OrdersController = require('../controllers/orders.controller');

module.exports = async (options = {}) => {
    return await OrdersController.getFraudOrders(buildContext(options));
};

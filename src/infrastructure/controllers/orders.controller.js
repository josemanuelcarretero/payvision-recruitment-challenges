'use strict';

const ListOrders = require('../../application/use_cases/listOrders.useCase');
const FilterFraudOrders = require('../../application/use_cases/filterFraudOrders.useCase');

module.exports = {
    async getFraudOrders(context) {
        // Treatment
        const orders = await ListOrders(context);

        const fraudOrders = await FilterFraudOrders(context, orders);

        // Output
        return context.fraudSerializer.serialize(fraudOrders);
    }
};

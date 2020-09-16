'use strict';

const FraudOrderSerializer = require('../serializers/fraudOrder.serializer');
const OrdersFromCSVFileRepository = require('../repositories/ordersFromCSVFile.repository');
const OrderFraudFilterRepository = require('../repositories/orderFraudFilter.repository');
const path = require('path');

function buildPresets() {
    const presets = {
        fraudSerializer: new FraudOrderSerializer(),
        orderRepository: new OrdersFromCSVFileRepository(process.cwd()),
        orderFraudFilterRepository: new OrderFraudFilterRepository(),
        dirname: path.join(process.cwd(), 'assets'),
        basename: ''
    };

    return presets;
}

module.exports = buildPresets();

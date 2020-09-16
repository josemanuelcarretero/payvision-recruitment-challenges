'use strict';

const Order = require('../../domain/value_objects/order.vo');
const OrderRepository = require('../../domain/repositories/order.repository');

module.exports = class extends OrderRepository {
    constructor() {
        super();
        this.data = {};
    }

    async add(order) {
        this.data[order.orderId] = Order.create(order);
        return order.orderId;
    }

    async addAll(orderList) {
        return await Promise.all(orderList.map((item) => this.add(item)));
    }

    async getAll() {
        return Object.values(this.data);
    }
};

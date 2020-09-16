'use strict';

const Order = require('../../domain/value_objects/order.vo');
const OrderRepository = require('../../domain/repositories/order.repository');
const CSVOrm = require('../orm/csv/csv');

module.exports = class extends OrderRepository {
    constructor() {
        super();
        this.csv = new CSVOrm(
            [
                'orderId',
                'dealId',
                'email',
                'street',
                'city',
                'state',
                'zipCode',
                'creditCard'
            ],
            '.'
        );
        this.csv.changeFile.apply(this.csv, Array.from(arguments));
    }

    changeFile() {
        this.csv.changeFile.apply(this.csv, Array.from(arguments));
    }

    async getAll() {
        return this.csv.getAll().map(Order.create);
    }

    async add(object) {
        this.csv.add(object);
        return object.orderId;
    }

    async addAll(objectList) {
        this.csv.addAll(objectList);
        return objectList.map((object) => {
            return object.orderId;
        });
    }
};

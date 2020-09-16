'use strict';

const OrderFilterRepository = require('../../domain/repositories/filter.repository');

module.exports = class OrderFraudFilterRepository extends OrderFilterRepository {
    static identificationEquals(orderA, orderB) {
        return orderA.dealId === orderB.dealId;
    }

    static creditCardNotEquals(orderA, orderB) {
        return orderA.creditCard !== orderB.creditCard;
    }

    static emailEquals(orderA, orderB) {
        return orderA.email === orderB.email;
    }

    static addressEquals(orderA, orderB) {
        return (
            orderA.city === orderB.city &&
            orderA.state === orderB.state &&
            orderA.zipCode === orderB.zipCode &&
            orderA.street === orderB.street
        );
    }

    static isFraud(orderA, orderB) {
        if (
            OrderFraudFilterRepository.identificationEquals(orderA, orderB) &&
            OrderFraudFilterRepository.creditCardNotEquals(orderA, orderB)
        ) {
            return (
                OrderFraudFilterRepository.addressEquals(orderA, orderB) ||
                OrderFraudFilterRepository.emailEquals(orderA, orderB)
            );
        }
        return false;
    }

    async filter(orders) {
        // (Fix) When there are more than 2 repeated fraudulent
        // orders with the same dealID, the result will have
        // multiple times the same repeated orderId
        const fraudOrders = {};
        for (let i = 0; i < orders.length; i++) {
            const current = orders[i];

            for (let j = i + 1; j < orders.length; j++) {
                if (OrderFraudFilterRepository.isFraud(current, orders[j])) {
                    fraudOrders[j] = orders[j];
                }
            }
        }
        return Object.values(fraudOrders);
    }
};

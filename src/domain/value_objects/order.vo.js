'use strict';

module.exports = class Order {
    constructor(
        orderId,
        dealId,
        email,
        street,
        city,
        state,
        zipCode,
        creditCard
    ) {
        this.orderId = orderId;
        this.dealId = dealId;
        this.email = email;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = state;
        this.creditCard = creditCard;
    }

    static create({
        orderId,
        dealId,
        email,
        street,
        city,
        state,
        zipCode,
        creditCard
    } = {}) {
        return new Order(
            orderId,
            dealId,
            email,
            street,
            city,
            state,
            zipCode,
            creditCard
        );
    }
};

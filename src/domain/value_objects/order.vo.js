'use strict';

const streetLookup = require('./street.values');
const stateLookup = require('./state.values');
const ValueObject = require('./valueObject');

module.exports = class Order extends ValueObject {
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
        super();
        this.validateValueObject('orderId', orderId, true, 'integer');
        this.validateValueObject('dealId', dealId, true, 'integer');
        this.validateValueObject('email', email, true, 'email', (value) => {
            return value.toLowerCase();
        });
        this.validateValueObject('street', street, true, 'string', (value) => {
            return Order.applyLookup(streetLookup, value.toLowerCase());
        });
        this.validateValueObject('city', city, true, 'string', (value) => {
            return value.toLowerCase();
        });
        // (Fixed) the 'state' field was being assigned with the value of the 'city' field
        /** Original
         * // Normalize state
         * order.state = order.street.replace('il', 'illinois').replace('ca', 'california').replace('ny', 'new york')
         *
         */
        /** Then
         * // Normalize state
         * order.state = order.street.replace('il', 'illinois').replace('ca', 'california').replace('ny', 'new york')
         *
         **/
        this.validateValueObject('state', state, true, 'string', (value) => {
            return Order.applyLookup(stateLookup, value.toLowerCase());
        });
        this.validateValueObject('zipCode', zipCode, true, 'string');
        this.validateValueObject('creditCard', creditCard, true, 'string');
    }

    static applyLookup(lookup, value) {
        return Object.keys(lookup).reduce((currentValue, word) => {
            return currentValue.replace(word, lookup[word]);
        }, value);
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

'use strict';

const _serializeSingleOrder = (order) => {
    return {
        isFraudulent: true,
        orderId: order.orderId
    };
};

module.exports = class {
    serialize(data) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (!Array.isArray(data)) {
            throw new Error('Expect data to be array');
        }
        return data.map(_serializeSingleOrder);
    }
};

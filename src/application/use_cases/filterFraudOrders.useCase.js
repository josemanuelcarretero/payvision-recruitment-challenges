'use strict';

module.exports = ({ orderFraudFilterRepository }, orders) => {
    return orderFraudFilterRepository.filter(orders);
};

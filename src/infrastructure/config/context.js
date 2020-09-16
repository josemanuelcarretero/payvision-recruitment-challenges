'use strict';

const presets = require('./presets');

const OrderRepository = require('./../../domain/repositories/order.repository');

function buildContext(options) {
    // Allows the function to be called by overriding the default settings
    const overrideContext = {
        ...presets
    };
    switch (options.database) {
        case 'custom':
            if (options.repository instanceof OrderRepository) {
                overrideContext.orderRepository = options.repository;
            } else {
                throw new Error(
                    'The entered repository is not an instance of OrderRepository'
                );
            }
            break;
        case undefined:
        case null:
        case 'csv':
            overrideContext.basename =
                options.basename || overrideContext.basename;
            overrideContext.dirname =
                options.dirname || overrideContext.dirname;
            overrideContext.orderRepository.changeFile(
                overrideContext.dirname,
                overrideContext.basename
            );
            break;
        default:
            throw new Error('Database not Support');
    }

    return overrideContext;
}

module.exports = buildContext;

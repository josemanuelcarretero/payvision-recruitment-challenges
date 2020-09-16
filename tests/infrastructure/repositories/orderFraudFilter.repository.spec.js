const FilterRepository = require('../../../src/domain/repositories/filter.repository');
const OrderFraudFilterRepository = require('../../../src/infrastructure/repositories/orderFraudFilter.repository');
const Order = require('../../../src/domain/value_objects/order.vo');

const orderDataList = [
    {
        orderId: '1',
        dealId: '1',
        email: 'bugs+Alias@bunny.com',
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        zipCode: '10011',
        creditCard: '12345689010'
    },
    {
        orderId: '2',
        dealId: '1',
        email: 'bugs+OtroAlias@bunny.com',
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        zipCode: '10011',
        creditCard: '12345689011'
    },
    {
        orderId: '3',
        dealId: '2',
        email: 'roger+Alias@rabbit.com',
        street: '1234 Not Sesame St.',
        city: 'Colorado',
        state: 'CL',
        zipCode: '10012',
        creditCard: '12345689012'
    },
    {
        orderId: '4',
        dealId: '2',
        email: 'roger@rabbit.com',
        street: '1234 Not Sesame St.',
        city: 'Colorado',
        state: 'CL',
        zipCode: '10012',
        creditCard: '12345689014'
    }
];

describe('OrderFraudFilterRepository', function () {
    it('should be a class derived from OrderRepository', function () {
        expect(typeof OrderFraudFilterRepository).toBe('function');
        expect(OrderFraudFilterRepository.prototype).toBeInstanceOf(
            FilterRepository
        );
    });
    it('should have the "filter" instance method', function () {
        expect(typeof OrderFraudFilterRepository).toBe('function');
        expect(typeof OrderFraudFilterRepository.prototype.filter).toBe(
            'function'
        );
        expect(OrderFraudFilterRepository.prototype.filter).not.toBe(
            FilterRepository.prototype.filter
        );
    });
    it('should return fraud orders from a list', async () => {
        const repository = new OrderFraudFilterRepository();
        const ordersAsInputList = orderDataList.map(Order.create);
        const ordersMustGetBackList = [
            Order.create(orderDataList[1]),
            Order.create(orderDataList[3])
        ];

        // when
        const ordersList = await repository.filter(ordersAsInputList);

        // then
        expect(ordersList).toEqual(ordersMustGetBackList);
    });
});

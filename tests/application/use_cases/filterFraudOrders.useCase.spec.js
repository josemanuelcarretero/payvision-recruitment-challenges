const filterFraudOrdersCase = require('../../../src/application/use_cases/filterFraudOrders.useCase');
const FilterRepository = require('../../../src/domain/repositories/filter.repository');
const Order = require('../../../src/domain/value_objects/order.vo');

const orderData = [
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
        email: 'bugs+Alias@bunny.com',
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        zipCode: '10011',
        creditCard: '12345689011'
    }
];

describe('Case filterFraudOrders', function () {
    it('returns the filtered elements of the entered list', async () => {
        const ordersAsInputList = [
            Order.create(orderData[0]),
            Order.create(orderData[1])
        ];
        const ordersMustGetBackList = [Order.create(orderData[1])];
        const mockFilterRepository = new FilterRepository();
        mockFilterRepository.filter = (orders) => {
            return [orders[1]];
        };

        // when
        const orders = await filterFraudOrdersCase(
            { orderFraudFilterRepository: mockFilterRepository },
            ordersAsInputList
        );

        // then
        expect(orders).toEqual(ordersMustGetBackList);
    });
});

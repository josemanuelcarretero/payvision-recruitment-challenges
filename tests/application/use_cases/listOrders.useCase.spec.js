const listOrdersCase = require('../../../src/application/use_cases/listOrders.useCase');
const OrderRepository = require('../../../src/domain/repositories/order.repository');
const Order = require('../../../src/domain/value_objects/order.vo');

const orderData = {
    orderId: '1',
    dealId: '1',
    email: 'bugs+Alias@bunny.com',
    street: '123 Sesame St.',
    city: 'New York',
    state: 'NY',
    zipCode: '10011',
    creditCard: '12345689010'
};

describe('Case listOrders', function () {
    it('should resolve with all the orders persisted in repository', async () => {
        const ordersGetAllList = [Order.create(orderData)];
        const ordersMustGetBackList = [Order.create(orderData)];
        const mockRepository = new OrderRepository();
        mockRepository.getAll = () => {
            return ordersGetAllList;
        };

        // when
        const orders = await listOrdersCase({
            orderRepository: mockRepository
        });

        // then
        expect(orders).toEqual(ordersMustGetBackList);
    });
});

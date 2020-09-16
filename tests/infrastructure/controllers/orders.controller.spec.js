const Order = require('../../../src/domain/value_objects/order.vo.js');
const OrdersController = require('../../../src/infrastructure/controllers/orders.controller.js');
const OrderRepository = require('../../../src/domain/repositories/order.repository');
const FilterRepository = require('../../../src/domain/repositories/filter.repository');
const FraudOrderSerializer = require('../../../src/infrastructure/serializers/fraudOrder.serializer');

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

describe('OrdersController', function () {
    it('should have the "getFraudOrders" method', function () {
        expect(typeof OrdersController).toBe('object');
        expect(typeof OrdersController.getFraudOrders).toBe('function');
    });
    it('should return a list with the order ID of the orders filte has detected as fraudulent', async () => {
        const mockRepository = new OrderRepository();
        const mockFilterRepository = new FilterRepository();
        const fraudOrderSerializer = new FraudOrderSerializer();

        const ordersGetAllList = orderDataList.map(Order.create);
        const fraudOrderIDMustGetBackList = [
            { isFraudulent: true, orderId: ordersGetAllList[1].orderId }
        ];

        mockRepository.getAll = () => {
            return ordersGetAllList;
        };
        mockFilterRepository.filter = (orders) => {
            return [orders[1]];
        };
        const fraudOrderIDList = await OrdersController.getFraudOrders({
            fraudSerializer: fraudOrderSerializer,
            orderRepository: mockRepository,
            orderFraudFilterRepository: mockFilterRepository
        });

        expect(fraudOrderIDList).toEqual(fraudOrderIDMustGetBackList);
    });
});

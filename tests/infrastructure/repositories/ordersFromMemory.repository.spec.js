const OrderRepository = require('../../../src/domain/repositories/order.repository');
const OrderFromMemoryRepository = require('../../../src/infrastructure/repositories/ordersFromMemory.repository');
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

describe('OrderFromMemoryRepository', function () {
    it('should be a class derived from OrderRepository', function () {
        expect(typeof OrderFromMemoryRepository).toBe('function');
        expect(OrderFromMemoryRepository.prototype).toBeInstanceOf(
            OrderRepository
        );
    });
    it('should have the "add" instance method', function () {
        expect(typeof OrderFromMemoryRepository).toBe('function');
        expect(typeof OrderFromMemoryRepository.prototype.add).toBe('function');
        expect(OrderFromMemoryRepository.prototype.add).not.toBe(
            OrderRepository.prototype.add
        );
    });
    it('should have the "addAll" instance method', function () {
        expect(typeof OrderFromMemoryRepository).toBe('function');
        expect(typeof OrderFromMemoryRepository.prototype.addAll).toBe(
            'function'
        );
        expect(OrderFromMemoryRepository.prototype.addAll).not.toBe(
            OrderRepository.prototype.addAll
        );
    });

    it('should have the "getAll" instance method', function () {
        expect(typeof OrderFromMemoryRepository).toBe('function');
        expect(typeof OrderFromMemoryRepository.prototype.getAll).toBe(
            'function'
        );
        expect(OrderFromMemoryRepository.prototype.getAll).not.toBe(
            OrderRepository.prototype.getAll
        );
    });
    it('should return all data that has been previously addeds', async () => {
        const repository = new OrderFromMemoryRepository();
        const ordersMustGetBackList = orderDataList.map(Order.create);

        await repository.addAll(orderDataList);

        // when
        const ordersList = await repository.getAll();

        // then
        expect(ordersList).toEqual(ordersMustGetBackList);
    });
});

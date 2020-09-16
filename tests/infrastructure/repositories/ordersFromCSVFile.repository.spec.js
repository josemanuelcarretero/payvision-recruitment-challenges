const OrderRepository = require('../../../src/domain/repositories/order.repository');
const OrdersFromCSVFile = require('../../../src/infrastructure/repositories/ordersFromCSVFile.repository');
const Order = require('../../../src/domain/value_objects/order.vo');
var path = require('path');
var fs = require('fs');

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

const rmTempFile = (file) => {
    return () => {
        return fs.unlinkSync(file);
    };
};

describe('OrdersFromCSVFile', function () {
    it('should be a class derived from OrdersFromCSVFile', function () {
        expect(typeof OrdersFromCSVFile).toBe('function');
        expect(OrdersFromCSVFile.prototype).toBeInstanceOf(OrderRepository);
    });
    it('should have the "add" instance method', function () {
        expect(typeof OrdersFromCSVFile).toBe('function');
        expect(typeof OrdersFromCSVFile.prototype.add).toBe('function');
        expect(OrdersFromCSVFile.prototype.add).not.toBe(
            OrderRepository.prototype.add
        );
    });
    it('should have the "addAll" instance method', function () {
        expect(typeof OrdersFromCSVFile).toBe('function');
        expect(typeof OrdersFromCSVFile.prototype.addAll).toBe('function');
        expect(OrdersFromCSVFile.prototype.addAll).not.toBe(
            OrderRepository.prototype.addAll
        );
    });

    it('should have the "getAll" instance method', function () {
        expect(typeof OrdersFromCSVFile).toBe('function');
        expect(typeof OrdersFromCSVFile.prototype.getAll).toBe('function');
        expect(OrdersFromCSVFile.prototype.getAll).not.toBe(
            OrderRepository.prototype.getAll
        );
    });

    it('should have the "changeFile" instance method', function () {
        expect(typeof OrdersFromCSVFile).toBe('function');
        expect(typeof OrdersFromCSVFile.prototype.changeFile).toBe('function');
    });

    describe('should return all data that has been previously addeds', function () {
        const basename = path.basename(__filename);
        const dirname = path.dirname(__filename);
        const csvFullname = path.join(dirname, basename + '.csv');

        it('with addAll', async () => {
            const repository = new OrdersFromCSVFile(csvFullname);
            const ordersMustGetBackList = orderDataList.map(Order.create);

            await repository.addAll(orderDataList);

            // when
            const ordersList = await repository.getAll();

            // then
            expect(rmTempFile(csvFullname)).not.toThrow();
            expect(ordersList).toEqual(ordersMustGetBackList);
        });

        it('with add', async () => {
            const repository = new OrdersFromCSVFile(csvFullname);
            const ordersMustGetBackList = orderDataList.map(Order.create);

            await Promise.all(
                orderDataList.map((orderData) => {
                    return repository.add(orderData);
                })
            );

            // when
            const ordersList = await repository.getAll();

            // then
            expect(rmTempFile(csvFullname)).not.toThrow();
            expect(ordersList).toEqual(ordersMustGetBackList);
        });
    });
});

const Order = require('../../../src/domain/value_objects/order.vo.js');

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

const expectedOrderData = {
    orderId: 1,
    dealId: 1,
    email: 'bugs@bunny.com',
    street: '123 sesame street',
    city: 'new york',
    state: 'new york',
    zipCode: '10011',
    creditCard: '12345689010'
};

const generateOrderWith = (defaultData, field, value) => {
    return () => {
        const data = {
            ...defaultData,
            [field]: value
        };
        return Order.create(data);
    };
};

describe('Order', function () {
    it('should have the "create" class method', function () {
        expect(typeof Order).toBe('function');
        expect(typeof Order.create).toBe('function');
    });
    describe('When you instance an Order class object', function () {
        it('with a null argment', function () {
            Object.keys(orderData).forEach((field) => {
                expect(generateOrderWith(orderData, field, null)).toThrow(
                    `the "${field}" field value can not be undefined or null`
                );
            });
        });

        it('with a not valid argments', function () {
            ['orderId', 'dealId'].forEach((field) => {
                expect(generateOrderWith(orderData, field, '')).toThrow(
                    `the "${field}" field value must be integer`
                );
            });
            ['email', 'street', 'city', 'state'].forEach((field) => {
                expect(generateOrderWith(orderData, field, 0)).toThrow(
                    `the "${field}" field value must be string`
                );
            });
            expect(
                generateOrderWith(orderData, 'email', 'notValidEmail')
            ).toThrow(`the "email" field value is not valid format`);
        });

        it('object data should be normalized', function () {
            const order = Order.create(orderData);
            expect(order.orderId).toEqual(expectedOrderData.orderId);
            expect(order.dealId).toEqual(expectedOrderData.dealId);
            expect(order.email).toEqual(expectedOrderData.email);
            expect(order.street).toEqual(expectedOrderData.street);
            expect(order.city).toEqual(expectedOrderData.city);
            expect(order.state).toEqual(expectedOrderData.state);
            expect(order.zipCode).toEqual(expectedOrderData.zipCode);
            expect(order.creditCard).toEqual(expectedOrderData.creditCard);
        });
    });
});

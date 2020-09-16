const getFraudOrders = require('../../../src/infrastructure/methods/getFraudOrders.method');

describe('Method getFraudOrders', function () {
    it('should be a method', function () {
        expect(typeof getFraudOrders).toBe('function');
    });

    it('Should process the one line file', async function () {
        const result = await getFraudOrders({
            basename: 'OneLineFile.txt'
        });
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(0);
    });

    it('Should process the two line file in which the second is fraudulent', async function () {
        const result = await getFraudOrders({
            basename: 'TwoLines_FraudulentSecond.txt'
        });
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0].isFraudulent).toBe(true);
        expect(result[0].orderId).toBe(2);
    });

    it('Should process the three line file in which the second is fraudulent', async function () {
        const result = await getFraudOrders({
            basename: 'ThreeLines_FraudulentSecond.txt'
        });
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0].isFraudulent).toBe(true);
        expect(result[0].orderId).toBe(2);
    });

    it('Should process the four line file in which more than one order is fraudulent', async function () {
        const result = await getFraudOrders({
            basename: 'FourLines_MoreThanOneFraudulent.txt'
        });
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0].isFraudulent).toBe(true);
        expect(result[0].orderId).toBe(2);
        expect(result[1].isFraudulent).toBe(true);
        expect(result[1].orderId).toBe(4);
    });
});

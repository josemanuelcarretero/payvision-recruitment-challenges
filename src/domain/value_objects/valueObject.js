const validator = require('email-validator');

// this regular expression allow us remove both the dots and the alias
// src: https://github.com/johno/normalize-email/blob/master/index.js
// src: https://tools.ietf.org/id/draft-newman-email-subaddr-01.html
const NORMALIZE_EMAIL_REGEX = /\.|\+.*$/g;

class ValueObject {
    static validateStringValueObject(field, value) {
        if (typeof value !== 'string')
            throw new Error(`the "${field}" field value must be string`);
    }

    static validateEmailValueObject(field, value) {
        ValueObject.validateStringValueObject(field, value);
        if (!validator.validate(value)) {
            throw new Error(`the "${field}" field value is not valid format`);
        }
    }

    static validateNumberValueObject(field, value) {
        if (NaN(value)) {
            throw new Error(`the "${field}" field value must be number`);
        }
    }

    static validateIntegerValueObject(field, value) {
        if (isNaN(value) || parseInt(value) !== parseFloat(value))
            throw new Error(`the "${field}" field value must be integer`);
    }

    static validateRequiredField(field, value) {
        if (value === undefined || value === null)
            throw new Error(
                `the "${field}" field value can not be undefined or null`
            );
    }

    static normalizeEmailValueObject(value) {
        const [username, domain] = value.split('@');
        // Src: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/substring
        // Src: https://tools.ietf.org/id/draft-newman-email-subaddr-01.html#toc
        // (Fixed) the substring method extracts characters from indexA to indexB without including it
        //     string.substring(indexA, indexB)
        // Since the index of the plus sign(atIndex) is the character that should not be included and not the character before it
        // Example: a.d.d.r.e.s.s+alias@domain.com -> address+alias@domain.com
        // (Simplify) Simplify code with regular expression. This expression eliminates subaddress and dots in the address
        return [username.replace(NORMALIZE_EMAIL_REGEX, ''), domain].join('@');
    }

    constructor() {
        this.data = {};
    }

    validateValueObject(field, value, required, type, transform) {
        if (required) {
            this.constructor.validateRequiredField(field, value);
        }
        if (type in this.constructor.validateValueObjectMethodsByType) {
            this.constructor.validateValueObjectMethodsByType[type](
                field,
                value
            );
        } else {
            throw new Error(`type "${type}" is not supported`);
        }
        if (type in this.constructor.transformationsValueObjectMethodsByType) {
            value = this.constructor.transformationsValueObjectMethodsByType[
                type
            ](value);
        }
        if (typeof transform === 'function') {
            value = transform(value);
        }
        this.data[field] = value;
        this.defineGetter(field);
    }

    equals(obj) {
        if (typeof obj !== 'object') return false;
        if (!(obj instanceof this.constructor)) return false;
        var fields = Object.keys(this.data);
        for (var x = 0; x < fields.length; x++) {
            if (!Object.is(obj[fields[x]], this[fields[x]])) return false;
        }
        return true;
    }

    defineGetter(field) {
        Object.defineProperty(this, field, {
            get: function () {
                return this.data[field];
            }
        });
    }

    toJSON() {
        return {
            ...this.data
        };
    }
}

ValueObject.validateValueObjectMethodsByType = {
    string: ValueObject.validateStringValueObject,
    email: ValueObject.validateEmailValueObject,
    number: ValueObject.validateNumberValueObject,
    float: ValueObject.validateNumberValueObject,
    integer: ValueObject.validateIntegerValueObject
};

ValueObject.transformationsValueObjectMethodsByType = {
    number: Number,
    float: Number,
    integer: Number,
    email: ValueObject.normalizeEmailValueObject
};

module.exports = ValueObject;

const path = require('path');
const fs = require('fs');

module.exports = class {
    constructor(fieldNames, ...filePaths) {
        this.fieldNames = fieldNames;
        this.changeFile.apply(this, Array.from(filePaths));
    }

    changeFile() {
        this.fullname = path.join.apply(null, Array.from(arguments));
    }

    getAll() {
        if (!fs.existsSync(this.fullname)) {
            throw new Error('File is not found');
        }
        const fileContent = fs.readFileSync(this.fullname, 'utf8');

        const textLines = fileContent.split('\n');
        const dataList = [];
        for (const textLine of textLines) {
            if (textLine.length === 0) {
                continue;
            }
            const fields = textLine.split(',');

            if (fields.length !== this.fieldNames.length) {
                throw new Error('File format is invalid');
            }

            const dataObject = {};
            for (var i = 0; i < fields.length; i++) {
                dataObject[this.fieldNames[i]] = String(fields[i]);
            }

            dataList.push(dataObject);
        }
        return dataList;
    }

    _add(object) {
        return this.fieldNames.map((name) => {
            if (object[name] === null || object[name] === undefined) {
                throw new Error(
                    'The object fields can not be null or undefined'
                );
            }
            switch (typeof object[name]) {
                case 'string':
                case 'number':
                    return String(object[name]);
                default:
                    throw new Error(
                        'The object fields must be string or number'
                    );
            }
        });
    }

    add(object) {
        const textLine = this._add(object);
        fs.appendFileSync(this.fullname, '\n' + textLine.join(','));
    }

    addAll(objectList) {
        const textLines = [];
        objectList.forEach((object) => {
            const textLine = this._add(object);
            textLines.push(textLine.join(','));
        });
        fs.appendFileSync(this.fullname, '\n' + textLines.join('\n'));
    }
};

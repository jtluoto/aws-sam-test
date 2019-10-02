'use strict';

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const uuidv1 = require('uuid/v1')
const TABLE_NAME = 'aws-sam-test-message'

exports.hello = (event, context, callback) => {

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {
        case 'GET':
            dynamo.scan({ TableName: TABLE_NAME }, done);
            break;
        case 'POST':
            let item = JSON.parse(event.body);
            item.id = uuidv1();
            dynamo.putItem({ TableName: TABLE_NAME, Item: item }, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};

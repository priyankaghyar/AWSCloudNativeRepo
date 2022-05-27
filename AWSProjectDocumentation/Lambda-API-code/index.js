console.log('loading function...');
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    console.log('event handler started');
    var operation = event.operation;
    if(operation == undefined){
        operation = 'GET';
    }
    console.log('Inside event handler : ');
    console.log(event.httpMethod);
    console.log(operation);
    let response;
    let statusCode = 200;
    switch(operation){
        case 'GET':
            console.log('Inside GET method to fetch the data from DynamoDB of Todos table');
            
            response = await dynamo.scan({ TableName: 'Todos' }).promise();
            console.log('Response of GET request :: '+response);
            break;
        case 'POST':
            console.log('Inside POST method to save the data in DynamoDB of Todos table');
            const params = {
                TableName: "Todos",
                Item: {
                    'tasktitle': event.tasktitle,
                    'description':  event.desc,
                    'documentname': event.documentname,
                    'imagename': event.imagename,
                    'completiondate': event.completiondate
                 }
             };
            response = await dynamo.put(params).promise().then(() => {
            
              console.log('Added task details successfully');
              return 'Task details added';
            });
          
          break;
        case 'PUT':
            console.log('Inside PUT method to update the data from DynamoDB of Todos table');
            const putparams = {
                TableName: "Todos",
                Item: {
                    'tasktitle': event.tasktitle,
                    'description': event.desc,
                    'documentname': event.documentname,
                    'imagename': event.imagename,
                    'completiondate': event.completiondate
                 },
             };
            response = await dynamo.put(putparams).promise().then(() => {
            
              console.log(`Updated task details successfully`);
              return 'Task details are updated';
            });
            break;
        case 'DELETE':
            console.log('Inside DELETE method to delete the data from DynamoDB of Todos table');
            const delparams = {
                TableName: "Todos",
                Key: {
                  'tasktitle': event.tasktitle,
                },
              };
            
              response = await dynamo.delete(delparams).promise().then(() => {
            
              console.log(`task details deleted successfully`);
              return 'Deleted Task details';
            });
            break;
        default:
            console.log('Please send the correct httpMethod request');
    }
    response = JSON.stringify(response);
    
    return {
    statusCode,
    response
  };
    
};

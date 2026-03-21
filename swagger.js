const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books and Authors APIs',
    description: 'APIs for managing books and authors'
  },
  host: 'https://cse341-project2-6689.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

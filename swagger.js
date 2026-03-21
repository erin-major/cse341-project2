const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books and Authors APIs',
    description: 'APIs for managing books and authors'
  },
  host: 'cse-341-project1-pa9w.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

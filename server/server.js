const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const app = express();
const PORT = 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

require('./config/connection');

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


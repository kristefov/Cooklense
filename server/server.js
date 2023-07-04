const express = require('express');
/* The code is importing the `ApolloServer` class from the `apollo-server-express` package and the
`typeDefs` and `resolvers` objects from the `./schemas` file. */
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas')
const path = require('path');
const db = require('./config/connection');

const { authMiddleware } = require('./utils/auth')

/* The code is creating an Express application, defining the port number for the server to listen on
(either the value of the `PORT` environment variable or 3001 if the variable is not set), and
creating a new instance of the ApolloServer class. */
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})

/* `app.use(express.urlencoded({ extended: true }));` and `app.use(express.json());` are middleware
functions in Express.js. */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

/* The `app.get('/', (req, res) => { ... })` code is defining a route handler for the root URL ("/") of
the application. When a GET request is made to the root URL, the server will respond by sending the
`index.html` file located in the `../client/build` directory. This is typically used in a
single-page application (SPA) setup, where the client-side code is built and served from the `build`
directory. */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

/**
 * The function starts an Apollo server and applies middleware to the app.
 */
const startApolloServer = async() => {
await server.start()
server.applyMiddleware({app})

/* `db.once('open', () => { ... })` is an event listener that listens for the 'open' event on the `db`
object. */
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})


}
startApolloServer()
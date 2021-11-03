import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import container from './config/container';

require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization || null;
      let user = null;
      if (token) {
        // const userId = await verifyToken(token);
        // user = await userService.getUser(userId);
        user = {};
      }

      return { user: user, ...container };
    }
  });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port: PORT });

  return { server, app };
}

startApolloServer().then(({ server }) => {
  console.log(process.env.DB_USER);
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath} in env: ${process.env.NODE_ENV}`
  );
});

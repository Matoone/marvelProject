import express, { Express } from 'express';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { container } from './config/container';
import { verifyToken } from './utils/auth';
import http from 'http';
import https from 'https';
import fs from 'fs';
require('dotenv').config();

const configurations = {
  // Note: You may need sudo to run on port 443
  production: {
    ssl: true,
    port: 443,
    hostname: 'ec2-13-38-1-89.eu-west-3.compute.amazonaws.com'
  },
  development: { ssl: false, port: 4000, hostname: 'localhost' }
};

const ENVIRONMENT = process.env.NODE_ENV || 'production';
const CONFIG = configurations[ENVIRONMENT as keyof typeof configurations];
const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }: { req: any }) => {
      const token = req.headers.authorization || null;
      let user = null;
      const containerInstance = container();
      if (token) {
        const userId = await verifyToken(token);
        user = await containerInstance.userService.getUser(userId);
      }

      return { user: user, ctx: containerInstance };
    }
  });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });
  // Create the HTTPS or HTTP server, per configuration
  let httpServer;
  if (CONFIG.ssl) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    httpServer = https.createServer(
      {
        key: fs.readFileSync(`./ssl/${ENVIRONMENT}/key.pem`),
        cert: fs.readFileSync(`./ssl/${ENVIRONMENT}/cert.pem`)
      },

      app
    );
  } else {
    httpServer = http.createServer(app);
  }

  httpServer.listen({ port: CONFIG.port });

  return { server, httpServer, app };
}

startApolloServer().then(({ server }) => {
  console.log(process.env.DB_USER);
  console.log(
    `🚀 Server ready at http${CONFIG.ssl ? 's' : ''}://${CONFIG.hostname}:${
      CONFIG.port
    }${server.graphqlPath} in env: ${ENVIRONMENT}`
  );
});

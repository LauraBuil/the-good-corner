import 'reflect-metadata';
import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
import dataSource from "./config/db";

async function startServer() {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [ AdResolver, CategoryResolver, TagResolver ],
  });
  const apolloServer = new ApolloServer({ schema: schema});
  const { url } = await startStandaloneServer(apolloServer);
  console.log(`🚀  Server ready at: ${url}`);
}
startServer();
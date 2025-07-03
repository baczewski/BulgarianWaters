import { typeDefs } from './schema/type-defs.js';
import { resolvers } from './resolvers/resolvers.js';
import { ApolloServer } from 'apollo-server';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    formatError: (err) => console.log(err)
});

server.listen(4000).then(() => console.log('Listening on port 4000'));

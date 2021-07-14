import { ApolloServer, gql } from 'apollo-server-micro';
import { makeExecutableSchema } from 'graphql-tools';
import connectToDatabase from '../../middleware/sub0';

export const typeDefs = gql`
        type User {
                _id: ID
                email: String
                emailVerified: String
                createdAt: String
                updatedAt: String
        }
        type Query {
                users: [User!]!
        }
`;

export const resolvers = {
        Query: {
                users(parent, args, context) {
                        return context.db
                                .collection('users')
                                .find({})
                                .toArray();
                },
        },
};

const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
});

export const config = {
        api: {
                bodyParser: false,
        },
};

const apolloServer = new ApolloServer({
        schema,
        context: async () => {
                const db = await connectToDatabase();
                return db;
        },
});

export default apolloServer.createHandler({ path: '/api/apollo-server' });


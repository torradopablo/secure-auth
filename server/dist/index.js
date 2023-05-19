import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import app from './api';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const getUser = (token) => {
    try {
        if (token) {
            return jwt.verify(token, jwtSecret);
        }
        return null;
    }
    catch (error) {
        return null;
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: eval(process.env.PORT) || 4000 },
    context: async ({ req, res }) => {
        const token = req.headers.authorization || '';
        const user = await getUser(token.replace('Bearer ', ''));
        if (!user) {
            throw new GraphQLError('User is not authenticated', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                },
            });
        }
        return { user };
    },
});
console.log(`🚀 Apollo server ready at: ${url}`);
app;

import { request } from 'graphql-request';
import { IntrospectionQuery } from 'graphql';
import { schemaQuery } from './queries';

export const getSchema = async (baseUrl: string) => {
  try {
    const { __schema }: IntrospectionQuery = await request(baseUrl, schemaQuery);
    return __schema;
  } catch (e) {
    console.log('Error with introspection query: ', (e as Error).message);
    throw e;
  }
};

import { request } from 'graphql-request';
import { IntrospectionQuery } from 'graphql';
import { API_BASE_URL } from '../constants';
import { schemaQuery } from './queries';

export const getSchema = async () => {
  try {
    const { __schema }: IntrospectionQuery = await request(API_BASE_URL, schemaQuery);
    return __schema;
  } catch (e) {
    console.log('Error with introspection query: ', (e as Error).message);
    throw e;
  }
};

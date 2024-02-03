import { Options } from "@vitejs/plugin-react";
import { GraphQLFormattedError } from "graphql"

const customFetch = async (url: string, options: Request) => {
    const accessToken = localStorage.getItem('access_token');

    const headers = options.headers as Record<string, string>;

    return await fetch(url, {
        ...options,
        headers: {
            ...headers,
            Authorization: headers?.Authorization || `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Apollo-Require-Preflight": "true",

        }
    })
}

const getGraphQLErrors = (body: Record<"errors", GraphQLFormattedError[] | undefined>): Error | null => {
    if (!body) {
        return {
            message: 'Unknow error',
            statusCode: "INTERNAL_SERVER_ERROR"
        }
    }
    if ('errors' in body) {
        const errors = body?.errors;


        const message = errors?.map((error) => error?.message)?.join("");
        const code = errors?.[0]?.extensions?.code;

        return {
            message: message || JSON.stringify(errors),
            statusCode: code || 500

        }
    }
    return null;
}

export const fetchWrapper = async (url: string, Options: RequestInit) => {
    const response = await customFetch(url, Options)
    const responseClone = response.clone();
    const body = await responseClone.json();

    const error = getGraphQLErrors(body);

    if (error) {
        throw error;
    }
    return response;
}
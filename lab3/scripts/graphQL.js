import config from './config.js';
import { displayList } from './script.js';
import { createClient as CreateClient, defaultExchanges,
	subscriptionExchange } from '@urql/core';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { pipe, subscribe } from 'wonka';


export function subscribeToChanges() {
	const subscriptionClient = new SubscriptionClient(
		'wss://weblab3.hasura.app/v1/graphql',
		{
			reconnect: true,
			connectionParams: {
				headers: getHeaders(),
			},
		},
	);

	const client = new CreateClient({
		url: 'https://weblab3.hasura.app/v1/graphql',
		fetchOptions: () => ({
			headers: getHeaders(),
		}),
		exchanges: [
			...defaultExchanges,
			subscriptionExchange({
				forwardSubscription: operation =>
					subscriptionClient.request(operation),
			}),
		],
	});

	pipe(
		client.subscription(config['subscription']),
		subscribe(result => {
			displayList(result.data.ToDoList);
		}),
	);
}

export async function startExecuteTask(name, variables) {
	const { data } = await fetchGraphQL(
		name,
		variables,
	);
	return data;
}

async function fetchGraphQL(operationName, variables) {
	const result = await fetch(
		'https://weblab3.hasura.app/v1/graphql',
		{
			method: 'POST',
			headers: getHeaders(),
			body: JSON.stringify({
				query: config['doc'],
				variables,
				operationName,
			}),
		},
	);
	return await result.json();
}

function getHeaders() {
	return {
		'Content-Type': 'application/json',
		'x-hasura-admin-secret': config['secret'],
	};
}



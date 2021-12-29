import { gql } from '@apollo/client';

export const config = {
	'address': 'wss://weblab5.hasura.app/v1/graphql',
	'auth-domain':'dev-qqsfii-e.us.auth0.com',
	'auth-client-id':'gdFMs7dzAVmJ8jsb21ngdpY4v9bPdlKW',
	'auth-callback-uri': 'https://lab5-marichellka.azurewebsites.net',
	'auth-audience':'https://dev-qqsfii-e.us.auth0.com/api/v2/',
	'add':gql`mutation addTask($task: ToDoList_insert_input!) {
				insert_ToDoList(objects: [$task]) {
					affected_rows
				}
			}`,
	'delete':gql`mutation deleteTask($id: Int!) {
				delete_ToDoList_by_pk(id: $id) {
					taskName
				}
			}`,
	'check':gql`mutation setTaskChecked($id: Int!, 
			$checked: Boolean!) {
				update_ToDoList_by_pk(pk_columns: 
				{id: $id}, _set: {Checked: $checked}) {
					Checked
			}
		}`,
	'subscription':gql`subscription Subscription { 
					ToDoList {
						Checked
						Date
						taskName
						id
					}
				}`,
};
export default config;

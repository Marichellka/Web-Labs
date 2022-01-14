import { gql } from '@apollo/client';

export const config = {
	'address': 'wss://weblab5.hasura.app/v1/graphql',
	'add': gql`mutation addTask($task: ToDoList_insert_input!) {
				insert_ToDoList(objects: [$task]) {
					affected_rows
				}
			}`,
	'delete': gql`mutation deleteTask($id: Int!) {
				delete_ToDoList_by_pk(id: $id) {
					taskName
				}
			}`,
	'check': gql`mutation setTaskChecked($id: Int!, 
			$checked: Boolean!) {
				update_ToDoList_by_pk(pk_columns: 
				{id: $id}, _set: {Checked: $checked}) {
					Checked
			}
		}`,
	'subscription': gql`subscription Subscription { 
					ToDoList {
						Checked
						Date
						taskName
						id
					}
				}`,
};
export default config;

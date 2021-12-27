export const config = {
	'address': 'weblab3.hasura.app/v1/graphql',
	'doc': `query getList {
				ToDoList {
					taskName
					Date
					Checked
					id
				}
			}
			mutation deleteTask($id: Int!) {
				delete_ToDoList_by_pk(id: $id) {
					taskName
				}
			}
			mutation addTask($task: ToDoList_insert_input!) {
				insert_ToDoList(objects: [$task]) {
					affected_rows
				}
			}
			mutation setTaskChecked($id: Int!, 
				$checked: Boolean!) {
					update_ToDoList_by_pk(pk_columns: 
					{id: $id}, _set: {Checked: $checked}) {
						Checked
				}
			}`,
	'subscription': `subscription Subscription { 
					ToDoList {
						Checked
						Date
						taskName
						id
					}
				}`,
};
export default config;

export const config = {
	'secret': 'qc4NyGz22znlelB4fq5LK522rj9A1BJD5gkLqxN5yze' +
	'XLhjuowoThnP70QAabvfw',
	'doc': `query getList {
				ToDoList {
					taskName
					Date
					Checked
				}
			}
			mutation deleteTask($taskName: String!) {
				delete_ToDoList_by_pk(taskName: $taskName) {
					taskName
				}
			}
			mutation addTask($task: ToDoList_insert_input!) {
				insert_ToDoList(objects: [$task]) {
					affected_rows
				}
			}
			mutation setTaskChecked($taskName: String!, 
			$checked: Boolean!) {
				update_ToDoList_by_pk(pk_columns: 
				{taskName: $taskName}, _set: {Checked: $checked}) {
					Checked
				}
			}`,
	'subscription': `subscription Subscription { 
					ToDoList {
						Checked
						Date
						taskName
					}
				}`,
};
export default config;

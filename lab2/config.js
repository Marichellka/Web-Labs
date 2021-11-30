export const baseURL =
	process.env.NODE_ENV.toLowerCase() === 'development' ?
		'https://localhost:5001/email' :
		'https://lab2apiemail.azurewebsites.net/email';
export default baseURL;

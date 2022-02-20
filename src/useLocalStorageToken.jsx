const useLocalStorageToken = () => {
	let token = null;
	if (localStorage.getItem('reduxState')) {
		token = JSON.parse(localStorage.getItem('reduxState')).userReducer.token;
	}
	return token;
};

export default useLocalStorageToken;

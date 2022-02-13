const useLocalStorageToken = () => {
	let token = null;
	if (localStorage.getItem('userData')) {
		token = JSON.parse(localStorage.getItem('userData'));
	}
	return token;
};

export default useLocalStorageToken;

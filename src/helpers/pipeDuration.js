// converts the minutes to hours and minutes
const timeGenerator = (data) => {
	let hours = parseInt(data / 24);
	let minutes = data - hours * 24;
	if (hours.toString().length === 1) hours = 0 + hours.toString();
	if (minutes.toString().length === 1) minutes = 0 + minutes.toString();
	return `${hours}:${minutes}`;
};

export { timeGenerator };

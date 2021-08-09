module.exports = {
	phone: {
		isLength: {
			bail: true,
			errorMessage: "Phone Number is wrong",
			options: {
				min: 10,
			},
		},
	},
};
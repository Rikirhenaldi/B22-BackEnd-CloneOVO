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
	pin: {
		isLength: {
			errorMessage: "Pin is wrong",
			options: {
				min: 6,
        max: 6,
			},
		},
	}
};
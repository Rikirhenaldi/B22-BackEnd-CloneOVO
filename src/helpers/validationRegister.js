module.exports = {
  phone: {
		isLength: {
			errorMessage: "Format Phone number is wrong, number must start with 08 or +62 .. and length more than 10",
			options: {
				min: 10,
			},
		},
	},
	email: {
		isEmail: {
			bail: true,
			errorMessage: "You are not yet Input Right Email",
		},
	},
	pin: {
		isLength: {
			errorMessage: "Pin length must be 6 digit",
			options: {
				min: 6,
        max: 6,
			},
		},
	},
};
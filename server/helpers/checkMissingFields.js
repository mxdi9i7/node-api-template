const checkMissingFields = (requiredData) => {
	const valueIndex = 1;
	const keyIndex = 0;
	const missingFields = [];

	Object.entries(requiredData).forEach((entry) => {
		if (!entry[valueIndex]) {
			missingFields.push(entry[keyIndex]);
		}
	});

	if (missingFields.length) {
		throw `Missing ${missingFields.join(', ')}`;
	}
};

export default checkMissingFields;
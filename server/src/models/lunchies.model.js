const lunchies = new Map();

const lunch = {
	flightNumber: 100,
	mission: 'Kepler Exploration X',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 10, 2028'),
	destination: 'Kepler-442 b',
	customers: ['NASA', 'NAVY'],
	isUpcoming: true,
	isSuccess: true,
};

lunchies.set(lunch.flightNumber, lunch);

module.exports = {
	lunchies,
};

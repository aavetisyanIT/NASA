const launches = new Map();

const launch = {
	flightNumber: 100,
	mission: 'Kepler Exploration X',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 10, 2028'),
	destination: 'Kepler-442 b',
	customers: ['NASA', 'NAVY'],
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLunches() {
	return Array.from(launches.values());
}

module.exports = {
	getAllLunches,
};

const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

let DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
	flightNumber: 100,
	mission: 'Kepler Exploration X',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 10, 2028'),
	target: 'Kepler-442 b',
	customers: ['NASA', 'NAVY'],
	upcoming: true,
	success: true,
};

saveLaunch(launch);

function launchExistsById(id) {
	return launches.has(+id);
}

async function getAllLaunches() {
	return await launches.find({}, { _id: 0, __v: 0 });
}
async function getLatestFlightNumber() {
	const latestLaunch = await launches.findOne().sort('-flightNumber');

	if (!latestLaunch) {
		return DEFAULT_FLIGHT_NUMBER;
	}

	return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
	const planet = await planets.findOne({
		keplerName: launch.target,
	});

	if (!planet) {
		throw new Error('No matching planet is found');
	}
	await launches.findOneAndUpdate(
		{
			flightNumber: launch.flightNumber,
		},
		launch,
		{ upsert: true },
	);
}

async function scheduleNewLaunch(launch) {
	const newFlightNumber = (await getLatestFlightNumber()) + 1;

	const newLaunch = Object.assign(launch, {
		success: true,
		upcoming: true,
		customers: ['NASA', 'NAVY'],
		flightNumber: newFlightNumber,
	});

	await saveLaunch(newLaunch);
}

function abortLaunchById(id) {
	const abortedLaunch = launches.get(+id);
	abortedLaunch.success = false;
	abortedLaunch.upcoming = false;
	return abortedLaunch;
}

module.exports = {
	launchExistsById,
	getAllLaunches,
	scheduleNewLaunch,
	abortLaunchById,
};

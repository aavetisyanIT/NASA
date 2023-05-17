const launches = require('./launches.mongo');

let latestFlightNumber = 100;

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

async function saveLaunch(launch) {
	await launches.updateOne(
		{
			flightNumber: launch.flightNumber,
		},
		launch,
		{ upsert: true },
	);
}

function addNewLaunch(launch) {
	latestFlightNumber++;
	launches.set(
		latestFlightNumber,
		Object.assign(launch, {
			flightNumber: latestFlightNumber,
			customers: ['NASA', 'NAVY'],
			upcoming: true,
			success: true,
		}),
	);
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
	addNewLaunch,
	abortLaunchById,
};

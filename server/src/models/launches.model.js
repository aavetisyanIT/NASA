const axios = require('axios');

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

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function loadLaunchesData() {
	const response = await axios.post(SPACEX_API_URL, {
		query: {},
		options: {
			populate: [
				{
					path: 'rocket',
					select: {
						name: 1,
					},
				},
				{
					path: 'payloads',
					select: {
						customers: 1,
					},
				},
			],
		},
	});

	const launchesDocs = response.data.docs;

	for (const launchDoc of launchesDocs) {
		const payloads = launchDoc['payloads'];

		const customers = payloads.flatMap(payload => {
			return payload['customers'];
		});

		const launch = {
			flightNumber: launchDoc['flight_number'],
			mission: launchDoc['name'],
			rocket: launchDoc['rocket']['name'],
			launchDate: launchDoc['date_local'],
			customers,
			upcoming: launchDoc['upcoming'],
			success: launchDoc['success'],
		};

		console.log(launch);
	}
}

async function launchExistsById(id) {
	return await launches.findOne({
		flightNumber: id,
	});
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

async function abortLaunchById(id) {
	const aborted = await launches.updateOne(
		{
			flightNumber: id,
		},
		{
			success: false,
			upcoming: false,
		},
	);

	return aborted.modifiedCount === 1;
}

module.exports = {
	loadLaunchesData,
	launchExistsById,
	getAllLaunches,
	scheduleNewLaunch,
	abortLaunchById,
};

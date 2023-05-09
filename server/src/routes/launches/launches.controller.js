const {
	getAllLaunches,
	addNewLaunch,
	abortLaunchById,
	launchExistsById,
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
	return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
	const launch = req.body;
	if (
		!launch.mission ||
		!launch.rocket ||
		!launch.target ||
		!launch.launchDate
	) {
		return res.status(400).json({ error: 'Missing required launch property' });
	}
	launch.launchDate = new Date(launch.launchDate);
	if (isNaN(launch.launchDate)) {
		return res.status(400).json({ error: 'Invalid lunch date' });
	}

	addNewLaunch(launch);
	return res.status(201).json(launch);
}

function httpAbortLaunchById(req, res) {
	const { id } = req.params;

	if (!launchExistsById(id)) {
		return res.status(404).json({ error: 'Launch ID is not found' });
	}

	return res.status(200).json(abortLaunchById(id));
}

module.exports = {
	httpGetAllLaunches,
	httpAddNewLaunch,
	httpAbortLaunchById,
};

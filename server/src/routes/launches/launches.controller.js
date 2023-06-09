const {
	getAllLaunches,
	scheduleNewLaunch,
	abortLaunchById,
	launchExistsById,
} = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
	return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
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

	await scheduleNewLaunch(launch);

	return res.status(201).json(launch);
}

async function httpAbortLaunchById(req, res) {
	const { id } = req.params;

	const existsLaunch = await launchExistsById(id);

	if (!existsLaunch) {
		return res.status(404).json({ error: 'Launch ID is not found' });
	}
	const aborted = await abortLaunchById(id);
	if (!aborted) {
		return res.status(400).json({
			error: 'Launch is not aborted',
		});
	}
	return res.status(200).json({
		ok: true,
	});
}

module.exports = {
	httpGetAllLaunches,
	httpAddNewLaunch,
	httpAbortLaunchById,
};

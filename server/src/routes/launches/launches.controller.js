const {
	getAllLaunches,
	addNewLaunch,
	deleteLaunchById,
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

function httpDeleteLaunchById(req, res) {
	console.log('AAA params id:', req.params.id);
	const { id } = req.params;
	if (!id) {
		return res.status(404).json({
			error: 'Missing launch ID',
		});
	}

	if (isNaN(Number(id))) {
		return res.status(404).json({
			error: 'Launch ID needs to be a number',
		});
	}

	const isLaunchDeleted = deleteLaunchById(id);
	if (!isLaunchDeleted)
		return res.status(404).json({ error: 'Launch ID is not found' });

	return res.status(200).json();
}

module.exports = {
	httpGetAllLaunches,
	httpAddNewLaunch,
	httpDeleteLaunchById,
};

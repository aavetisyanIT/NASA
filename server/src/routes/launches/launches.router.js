const express = require('express');

const {
	httpGetAllLaunches,
	httpAddNewLaunch,
	httpDeleteLaunchById,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpDeleteLaunchById);

module.exports = launchesRouter;

import express from 'express';
import { DeviceController } from '../controllers/device.controller.js';


/**
 * Route definitions of the State page
 * @param {express.Express} app Instance of an Express application.
 */

export const Devices = (app) => {
    const router = express.Router();
    app.use('/dashboard', router);
    router.get('/', DeviceController.get )
  };
import express from 'express';
import { StoreController } from '../controllers/store.controller.js';

/**
 * Route definitions of the State page
 * @param {express.Express} app Instance of an Express application.
 */
export const Shop = (app) => {
    const router = express.Router();
    app.use('/shop', router);
    router.get('/', StoreController.get)
  };

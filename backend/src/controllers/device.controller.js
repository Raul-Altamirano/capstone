import express from 'express';
import { constants } from 'http2';
import { APIWeather } from '../providers/weather.provider.js';

//import { APIWeather } from '../providers/weather.provider.js';
let io;
const app = express()
export const DeviceController = {
  /** Get handler for Main route
   * Controller functions for Main Route
   * @param {import('express').Request} req Request body
   * @param {import('express').Response} res Response body
   * @param {import('express').NextFunction} next Next function
   */

    get: async(req, res, next) => {

        try {

            req.app.get("socketService").emiter('message', req.body);
             //const dataW = await APIWeather('19.32','-99.16')
            //const dataW = await  APIWeather('16.403878','-95.600088')
            //'19.44','-99.27', -99.186324
            //16.195449, -95.201076
            //20.665114, -103.355498
            const dataW = await Promise.all([APIWeather('20.66','-103.35'), APIWeather('16.403878','-95.600088')]).then(result => result)

            // console.log('¢¢¢¢¢¢¢¢¢¢¢¢¢¢',dataW)

            io = req.app.get('io')
            console.log('en el controlador del dispositivo');
            // io.emit('conecting',{message:'buscando el dispositivo IOT'})
            res.status(constants.HTTP_STATUS_OK).json(dataW);
        } catch (error) {
            next(error);
        }

    }

}


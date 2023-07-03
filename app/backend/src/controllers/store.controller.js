import { constants } from 'http2';

export const StoreController = {
  /** Get handler for Main route
   * Controller functions for Main Route
   * @param {import('express').Request} req Request body
   * @param {import('express').Response} res Response body
   * @param {import('express').NextFunction} next Next function
   */
    get: async(req, res, next) => {

        try {

            res.status(constants.HTTP_STATUS_OK).json({message:"hola"});
        } catch (error) {
            next(error);
        }

    }

}


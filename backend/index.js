import express from 'express';
import cors from 'cors';
const app = express();
import {createServer} from 'http'
const httpServer = createServer(app);

import {SocketService, socketListen} from './src/config/socket_Setup.js'
import { Shop } from './src/routes/store.routes.js';
import { Devices } from './src/routes/devices.sockets.routes.js';
import { update_weather } from './src/sockets/update-weather.js';
import { update_device } from './src/sockets/update-devices.js';

// const io = socketListen(httpServer);
//////////////////////////////////////////////////
//                                              //
//                       MW                     //
//                                              //
//////////////////////////////////////////////////

// app.set('io', new SocketService(httpServer));
app.set("socketService", new SocketService(httpServer));
update_weather(app);
update_device(app);
// app.set('Sio',socketListen(httpServer));
app.use(cors());
app.set('port', process.env.PORT || 3000);

//////////////////////////////////////////////////
//                                              //
//                    Routes                    //
//                                              //
//////////////////////////////////////////////////

Shop(app);
Devices(app);

//////////////////////////////////////////////////
//                                              //                                  
//                    Config                    //
//                                              //
//////////////////////////////////////////////////

httpServer.listen(app.get('port'), () => {
    console.log('Runing on port', app.get('port'));
});

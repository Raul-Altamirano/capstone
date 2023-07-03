//import socket from 'socket.io'
import { Server } from 'socket.io';
import { APIWeather } from '../providers/weather.provider.js';
import { GetClient } from '../collections/user.model.js';

const apiKey = 'b12b389e1e6f9f56999f3a13d164c63d'

export function socketListen(http) {
    const socket = new Server(http, { cors: { origin: '*' } });

    socket.on('connection', async (client, pay) => {
        console.log('cliente conectado')

        // const user = await GetClient('6495194393692ce8527f4a42')

        // client.on('*', (data)=>{
        //     // console.log(data)
        //     console.log(data)
        // })

        //APIWeather('19.463897','-99.246042')

        client.on('roomTemp', (data) => {
          data.roomTemp = data.roomTemp.split('.')[0] + Math.random()
          console.log("data recibido", data)
        });
        
        client.on('disconnect', client => {
            console.log('cliente DESCONECTADO')
        })
    })
    return socket;
}

export class SocketService {

    constructor(server) {
      this.io = new Server(server, { cors: { origin: '*' } });
      this.io.on('connection', socket => {
        console.log('####user connected####')


        socket.on('roomTemp', (data) => {
          console.log(data.roomTemp)
          data.roomTemp = (Number((data.roomTemp) + Math.random().toFixed(2))/10).toFixed(2)
          data.devices[0].temperature = (Number(data.devices[0].temperature) + Math.random()).toFixed(2)
          data.devices[1].temperature = (Number(data.devices[1].temperature) + Math.random()).toFixed(2)
          data.devices[2].temperature = (Number(data.devices[2].temperature) + Math.random()).toFixed(2)
          socket.broadcast.emit("device",data  )
          console.log("data recibido de ESP32",data )
        });
    });
  } 
 


   emiter(event, body) {
     if(body)
     console.log(body)
       this.io.emit(event, body);
   }
 }
 


 
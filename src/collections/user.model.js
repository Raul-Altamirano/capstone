import mongo from '../config/db.js';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'users';
let conexion;

const _0005 = '0005';
const GetClient = async id => {
  const hrstart = process.hrtime();
  conexion = await mongo.conectar(conexion);
  const db = conexion.dataBase;
  const coleccion = db.collection(COLLECTION_NAME);

  /*const clienteI = await coleccion.insertOne({name:'Raul', type:'person'});
  console.log(clienteI);*/
  const cliente = await coleccion.findOne({'_id': new ObjectId(id)});
  console.log(JSON.stringify(cliente));
  console.log(`[execution Time],[dao.clientesDao.obtenerCliente]`);
  const hrend = process.hrtime(hrstart);
  console.log('Execution [time[getAddress] (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  return cliente;
};
export { GetClient, };

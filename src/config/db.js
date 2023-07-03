import Mongo from 'mongodb';

const MongoClient = Mongo.MongoClient;

import util from 'util';

const stringConection              = process.env.stringConection;
const dbName                       = process.env.dbName;
const dbUser                       = process.env.dbUser;
const pwd                          = process.env.pwd;

let conexion = null;
let estatusConexion = false;

const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/iot?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0'

const conectar = async (conexionMongo) => {
  const propiedades = {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  };
  if (conexionMongo) {
    conexion = conexionMongo.conexion;
    estatusConexion = conexion?.isConnected();
  }

  for (let i = 1; i <= 3 && !estatusConexion; i++) {
    console.log('[mongo.conectar], Intento de conexion:', i);
    conexion = await MongoClient.connect(CONNECTION_STRING, propiedades)
      .then(res => {
        
        console.log(res.topology.s.state)
        estatusConexion = res?.topology?.s?.state == 'connected' ? true:false
        console.log('[mongo.conectar], estatusConexion:', estatusConexion);
        return res;
      })
      .catch(error => {
        console.log('[mongo.conectar], No se pudo establecer la conexion con el servidor:', error);
      });
  }
  const dataBase = conexion.db(dbName);


  return { conexion, dataBase, };
};

export default { conectar };

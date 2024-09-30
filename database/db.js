import dotenv from 'dotenv'
import { Sequelize } from 'sequelize';

dotenv.config();

const conection_db = new Sequelize("memerium", "root", process.env.KEY_DB, {
    host: 'localhost',
    dialect:'mysql' ,
    define:{
        timestamps:false
    }
  });

export default conection_db
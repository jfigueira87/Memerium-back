import { DataTypes } from "sequelize";
import conection_db from "../database/db.js";

const memeModel = conection_db.define(
    'memes',
    {
        title:{
            type: DataTypes.STRING,
            allowNull: false,            
        },
        category:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        tags:{
            type:DataTypes.STRING,
            allowNull:false,        
        },
        url:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    }
)

export default memeModel;
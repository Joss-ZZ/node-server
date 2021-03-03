const mongoose  = require("mongoose");


const dbConnection = async()=> {

    try{

        mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        
        console.log('Base de datos online')

    }catch(error){

        throw new Error('Hubo un error al iniciar la base de datos');

    }

}

module.exports = {
    dbConnection
}

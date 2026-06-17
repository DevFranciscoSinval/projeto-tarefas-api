const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado com sucesso!')
    } catch (erro) {
        console.error('Erro ao conectar no MongoDB:',erro.message);
        process.exit(1);
    }
};

module.exports = connectDB;
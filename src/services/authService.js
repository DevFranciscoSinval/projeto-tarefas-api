const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/jwt');

const register = async ({ name, email, password}) => {
    if(!name?.trim() || !email?.trim() || !password.trim()) {
        const error = new Error ('Nome, email e senha são obrigatórios');
        error.status = 400;
        throw error;
    }

    const existingUser = await userRepository.findUserByEmail(email);

    if(existingUser) {
        const error = new Error ('Email já cadastrado');
        error.status = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser({
        name,
        email,
        password: hashedPassword
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
};

const login = async ({ email, password}) => {
    if(!email?.trim() || !password?.trim()) {
        const error = new Error('Email e senha são obrigatórios');
        error.status = 400; 
        throw error;
    }

    const user = await userRepository.findUserByEmail(email);

    if(!user) {
        const error = new Error('Credencias inválidas');
        error.status = 400;
        throw error;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        const error = new Error('Credencias inválidas');
        error.status = 401;
        throw error;
    }

    const token = generateToken(user._id);

    return {
        token, 
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    };
};

module.exports = { register, login };
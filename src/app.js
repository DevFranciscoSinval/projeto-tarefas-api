const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    return res.status(200).json({
        status: 'ok',
        message: 'oi'
    });
});

app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use(errorHandler);

module.exports = app;
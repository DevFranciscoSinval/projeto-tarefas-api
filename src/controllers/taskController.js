const taskService = require('../services/taskService');

const create = async (req, res, next) => {
    try {
        const task = await taskService.createTask(req.userId, req.body);
        return res.status(201).json({
            message: 'Tarefa criada com sucesso',
            task
        });
    } catch (error) {
        next(error);
    }
};

const list = async (req, res, next) => {
    try {
        const result = await taskService.listTasks(req.userId, req.query);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const task = await taskService.getTaskById(req.userId, req.params.id);
        return res.status(200).json({ task });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const task = await taskService.updateTask(req.userId, req.params.id, req.body);
        return res.status(200).json({
            message: 'Tarefa atualizada com sucesso',
            task
        });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        await taskService.deleteTask(req.userId, req.params.id);
        return res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
        next(error);
    }
};

module.exports = { create, list, getOne, update, remove };
const taskRepository = require('../repositories/taskRepository');

const VALID_PRIORITIES = ['Baixa', 'Média', 'Alta'];
const VALID_STATUSES = ['A Fazer', 'Em Andamento', 'Concluído'];

const createTask = async (userId, data) => {
    if (!data.title?.trim() || !data.description?.trim()) {
        const error = new Error('Título e Descrição são obrigatórios');
        error.status = 400;
        throw error;
    }

    if (data.priority && !VALID_PRIORITIES.includes(data.priority)) {
        const error = new Error(`Prioridade inválida. Use: ${VALID_PRIORITIES.join(', ')}`);
        error.status = 400;
        throw error;
    }

    if (data.status && !VALID_STATUSES.includes(data.status)) {
        const error = new Error(`Status inválido. Use: ${VALID_STATUSES.join(', ')}`);
        error.status = 400;
        throw error;
    }

    const task = await taskRepository.create({
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        data_limite: data.data_limite,
        user: userId
    });

    return task;
};

const listTasks = async (userId, query) => {
    const filter = { user: userId };

    if (query.status) {
        filter.status = query.status;
    }

    if (query.priority) {
        filter.priority = query.priority;
    }

    if (query.search) {
        const regex = new RegExp(query.search, 'i');
        filter.$or = [
            { title: regex },
            { description: regex }
        ];
    }

    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.max(parseInt(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
        taskRepository.findAll(filter, skip, limit),
        taskRepository.count(filter)
    ]);

    return {
        tasks,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getTaskById = async (userId, taskId) => {
    const task = await taskRepository.findById(taskId);

    if (!task || task.user.toString() !== userId) {
        const error = new Error('Tarefa não encontrada');
        error.status = 404;
        throw error;
    }

    return task;
};

const updateTask = async (userId, taskId, data) => {
    await getTaskById(userId, taskId);

    if (data.priority && !VALID_PRIORITIES.includes(data.priority)) {
        const error = new Error(`Prioridade inválida. Use: ${VALID_PRIORITIES.join(', ')}`);
        error.status = 400;
        throw error;
    }

    if (data.status && !VALID_STATUSES.includes(data.status)) {
        const error = new Error(`Status inválido. Use: ${VALID_STATUSES.join(', ')}`);
        error.status = 400;
        throw error;
    }

    const updatedTask = await taskRepository.updateById(taskId, data);

    return updatedTask;
};

const deleteTask = async (userId, taskId) => {
    await getTaskById(userId, taskId);

    await taskRepository.deleteById(taskId);
};

module.exports = { createTask, listTasks, getTaskById, updateTask, deleteTask };
const Task = require('../models/Task');

const create = (taskData) => {
    return Task.create(taskData);
};

const findById = (id) => {
    return Task.findById(id);
};

const findAll = (filter, skip, limit) => {
    return Task.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
};

const count = (filter) => {
    return Task.countDocuments(filter);
};

const updateById = (id, updateData) => {
    return Task.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteById = (id) => {
    return Task.findByIdAndDelete(id);
};

module.exports = { create, findById, findAll, count, updateById, deleteById };
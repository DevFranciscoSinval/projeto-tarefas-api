const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [Baixa, Média, Alta]
 *               status:
 *                 type: string
 *                 enum: [A Fazer, Em Andamento, Concluído]
 *               data_limite:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.post('/', taskController.create);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista as tarefas do usuário autenticado
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [A Fazer, Em Andamento, Concluído]
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [Baixa, Média, Alta]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Busca por palavra-chave no título ou descrição
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de tarefas com paginação
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/', taskController.list);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Busca uma tarefa pelo id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *       404:
 *         description: Tarefa não encontrada
 */
router.get('/:id', taskController.getOne);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [Baixa, Média, Alta]
 *               status:
 *                 type: string
 *                 enum: [A Fazer, Em Andamento, Concluído]
 *               data_limite:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.put('/:id', taskController.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Exclui uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa excluída com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete('/:id', taskController.remove);

module.exports = router;
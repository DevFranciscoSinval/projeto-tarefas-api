# Task Manager API

API REST para gerenciamento de tarefas, inspirada no estilo Trello. Permite que usuários se cadastrem, façam login e gerenciem suas próprias tarefas com controle de prioridade, status, prazos, filtros dinâmicos, paginação e busca textual.

Projeto desenvolvido como trabalho final do terceiro semestre, focado em JavaScript, aplicando conceitos de arquitetura em camadas, autenticação via JWT, persistência com MongoDB e documentação interativa com Swagger.

## Funcionalidades

- Cadastro e autenticação de usuários via JWT
- Isolamento de dados: cada usuário só visualiza e gerencia suas próprias tarefas
- CRUD completo de tarefas (criar, listar, buscar por id, atualizar, excluir)
- Campos de tarefa: título, descrição, prioridade (Baixa, Média, Alta), status (A Fazer, Em Andamento, Concluído) e data limite
- Filtros dinâmicos via query parameters (status e prioridade)
- Paginação configurável (page e limit)
- Busca textual por palavras-chave no título ou na descrição
- Tratamento de erros centralizado com respostas HTTP semânticas
- Documentação interativa via Swagger (OpenAPI)

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB com Mongoose
- JSON Web Token (jsonwebtoken)
- bcryptjs para hash de senhas
- Swagger (swagger-jsdoc e swagger-ui-express)
- dotenv para variáveis de ambiente
- nodemon para desenvolvimento

## Arquitetura

O projeto segue o padrão Service-Repository, separando responsabilidades em camadas:

```
src/
├── config/         # Configuração de banco de dados e Swagger
├── controllers/     # Recebem requisições e retornam respostas HTTP
├── middlewares/      # Autenticação JWT e tratamento de erros
├── models/          # Schemas do Mongoose (User, Task)
├── repositories/      # Acesso direto ao banco de dados
├── routes/         # Definição de rotas e documentação Swagger
├── services/        # Regras de negócio e validações
├── utils/          # Funções auxiliares (geração de token)
├── app.js          # Configuração do Express
└── server.js        # Inicialização do servidor e conexão com o banco
```

Fluxo de uma requisição: Rota → Middleware (quando necessário) → Controller → Service → Repository → Banco de Dados.

## Pré-requisitos

- Node.js instalado (versão 18 ou superior recomendada)
- MongoDB instalado e em execução localmente, ou uma string de conexão do MongoDB Atlas

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/DevFranciscoSinval/projeto-tarefas-api.git
cd projeto-tarefas-api
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
MONGO_URI=mongodb://localhost:27017/projetoTarefas
JWT_SECRET=sua_chave_secreta_aqui
PORT=3000
```

## Como executar

Modo desenvolvimento (com reinicialização automática):

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

## Documentação da API

A documentação interativa, gerada com Swagger, está disponível em:

```
http://localhost:3000/apidocs
```

Nela é possível visualizar todas as rotas, seus parâmetros, e testá-las diretamente pelo navegador. Para testar rotas protegidas, é necessário primeiro autenticar-se via `/auth/login` e depois clicar em **Authorize**, colando o token JWT retornado.

## Endpoints principais

### Autenticação

| Método | Rota | Descrição | Protegida |
|---|---|---|---|
| POST | /auth/register | Cadastra um novo usuário | Não |
| POST | /auth/login | Autentica o usuário e retorna um token JWT | Não |

### Tarefas

| Método | Rota | Descrição | Protegida |
|---|---|---|---|
| POST | /tasks | Cria uma nova tarefa | Sim |
| GET | /tasks | Lista as tarefas do usuário autenticado | Sim |
| GET | /tasks/:id | Busca uma tarefa específica pelo id | Sim |
| PUT | /tasks/:id | Atualiza uma tarefa existente | Sim |
| DELETE | /tasks/:id | Exclui uma tarefa | Sim |

Rotas protegidas exigem o envio do header `Authorization: Bearer <token>`.

### Filtros, paginação e busca

A rota `GET /tasks` aceita os seguintes query parameters, que podem ser combinados livremente:

| Parâmetro | Tipo | Descrição |
|---|---|---|
| status | string | Filtra por status: A Fazer, Em Andamento ou Concluído |
| priority | string | Filtra por prioridade: Baixa, Média ou Alta |
| search | string | Busca por palavra-chave no título ou na descrição |
| page | number | Número da página de resultados (padrão: 1) |
| limit | number | Quantidade de itens por página (padrão: 10) |

Exemplo:

```
GET /tasks?status=Em Andamento&priority=Alta&search=relatorio&page=1&limit=5
```

## Exemplo de uso

Cadastro de usuário:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Maria Silva", "email": "maria@email.com", "password": "123456"}'
```

Login:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "maria@email.com", "password": "123456"}'
```

Criação de tarefa (substitua `<token>` pelo token retornado no login):

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "Estudar para a prova", "description": "Revisar conteúdo de backend", "priority": "Alta", "status": "A Fazer", "data_limite": "2026-06-30"}'
```

## Tratamento de erros

A API retorna códigos de status HTTP semânticos para cada situação:

| Código | Significado |
|---|---|
| 200 | Requisição bem-sucedida |
| 201 | Recurso criado com sucesso |
| 400 | Dados inválidos ou ausentes na requisição |
| 401 | Não autenticado ou credenciais inválidas |
| 403 | Acesso não autorizado ao recurso |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

## Autores

- **Francisco Sinval Junior** — Arquitetura do projeto, autenticação JWT, CRUD de tarefas, integração com MongoDB, documentação Swagger
- **Bianka Rocha da Silva** — Planejamento da arquitetura
- **Carlos Felipe Souza** — Revisão de código 
- **Lincoln Figuereido Silva** — Levantamento de requisitos
- **Joao Gabriel Aguiar** — Apresentação do projeto

## Licença

Projeto acadêmico desenvolvido para fins educacionais.

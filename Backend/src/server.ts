import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid'; // uuid é um pacote para gerar um id unico para o usuário.

const app = express();

app.use(express.json());
app.use(cors({}));

interface User {
    id: string;
    name: string;
    email: string;
}

const users: User[] = []; // variável apenas para teste, quando reiniciar o servidor ela vai sumir com os dados.

//porta de desenvolvimento definida abaixo
//http://localhost:3333/users

//rotas e métodos http -> GET | post | put | delete
app.get('/users', (request, response) => {
    return response.json(users);
    // retornando os dados dos usuarios
});

app.post('/users', (request, response) => {
    const { name, email } = request.body;
    //recebendo os dados do novo usuario
    const user = { id: uuid(), name, email };
    //criar um novo usuário
    users.push(user);
    //registrar esse usuário na bese de dados
    return response.json(user);
    //retornar os dados do usuário criado
});

app.put('/users/:id', (request, response) => {
    const { id } = request.params;
    const { name, email } = request.body;
    // recebe os dados do usuario
    const userIndex = users.findIndex((user) => user.id === id);
    //localiza o usuario na base de dados
    if (userIndex < 0) {
        return response.status(404).json({ error: 'usuario não encontrado' });
    }
    //se o usuario não existir, retorna um erro
    const user = { id, name, email };
    users[userIndex] = user;
    //atualiza o usuario na base de dados
    return response.json(user);
    //retorna os documentos do usuário atualizado
});

app.delete('/users/:id', (request, response) => {
    const { id } = request.params;
    // receber id do usuario - foi implementado acima users/:id
    const userIndex = users.findIndex((user) => user.id === id);
    //localiza o usuario na base de dados
    if (userIndex < 0) {
        return response.status(404).json({ error: 'Usuario não encontrado' });
    } //se o usuario não existir, retorna um erro
    users.splice(userIndex, 1);
    // excluir o usuário da base de dados
    return response.status(204).send();
    // retorna status de sucesso
});

// inicialização do back
app.listen('3333', function () {
    console.log('back-end started!');
});

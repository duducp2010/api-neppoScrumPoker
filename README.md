Neppo Scrum Poker
=====================

### Api Restful

Certifique-se que você tenha instalado o [NodeJs](https://nodejs.org/en/download/) em sua máquina.

Clone o projeto para sua máquina:
```bash
$ git clone <LINK DO REPOSITÓRIO>
```

Após ter o projeto em sua máquina, execute o comando abaixo no terminal para poder instalar as dependências necessárias:
```bash
$ npm install
```

- Configure a conexão com MongoDB no diretório: `config/database.js`

Para rodar o servidor e testar a api, execute:
```bash
$ npm start
```

### Rota para Registro de Usuário

- Registro
{POST} /api/auth/register
```bash
email: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true,
    min: 6
},
departamento: {
    type: String,
    required: true,
},
funcao: {
    type: String,
    enum: ['Administrador', 'Usuário'],
    default: 'Usuário'
}
```

### Rotas para Autenticação e Checagem

- Autenticação
{POST} /api/auth/login
```bash
email: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true,
    min: 6
}
```

- Checar Autenticação
{GET} /api/auth/protected
```bash
HEADER: {
    Authorization: JWT <token>
}
```

### Projetos

Sempre enviar o Header: `Authorization <token>`

- Cadastrar
{POST} /api/project/create

- Deletar
{POST} /api/project/delete/:id_project

- Listar todos cadastrados
{GET} /api/project/all
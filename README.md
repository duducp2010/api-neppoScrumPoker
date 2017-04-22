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

Sempre enviar o Header: `Authorization: JWT <token>`

##### Cadastrar
```bash
{POST} /api/project
```

##### Atualizar
```bash
{PUT} /api/project/:id_project
```

##### Deletar
```bash
{DELETE} /api/project/:id_project
```

Obs.: Somente quem cadastrou o projeto pode exclui-lo

##### Listar projetos cadastrados
```bash
{GET} /api/project
```

- Para verificar se o usuário pertence a equipe do projeto, acrescente o parametro 
`userTime=true` na url. Isso fará com que todos os projetos, que o usuário pertence, sejam mostrado ao usuário. Ex.: `http:\\meusite.com/api/project/?userTime=true`

- Para ordernar a busca por determinada key, acrescente o parametro `orderBy=NOME_DA_KEY` na url. Ex.: `http:\\meusite.com/api/project/?orderBy=title`

- Para ordernar a busca em Ascendente ou Descendente, acrescente o parametro `sort=asc` para ordenar em Ascendente ou `sort=desc` para ordenar em Descendente.. Ex.: `http:\\meusite.com/api/project/?orderBy=title&sort=asc`

- Para limitar a quantidade de documentos a ser mostrado após a consulta, acrescente o parametro `limit=QUANTIDADE`. Ex.: `http:\\meusite.com/api/project/?limit=2`, neste caso irá mostrar somente 2 documentos.

- Para trazer apenas algumas keys do documento, acrescente o parametro `select=KEY1 KEY2`. Ex.: `http:\\meusite.com/api/project/?select=_id title`. Pode ser informada várias key desde que cada uma tenha um espaço entre elas.

##### Listar determinado projeto
```bash
{GET} /api/project/:id_project
```

- Para verificar se o usuário pertence a equipe do projeto, acrescente o parametro 
`?userTime=true` na url. Isso fará com que o projeto seja mostrado ao usuário. Ex.: `http:\\meusite.com/api/project/?userTime=true`

- Para trazer apenas algumas keys do documento, acrescente o parametro `select=KEY1 KEY2`. Ex.: `http:\\meusite.com/api/project/?select=_id title`. Pode ser informada várias key desde que cada uma tenha um espaço entre elas.
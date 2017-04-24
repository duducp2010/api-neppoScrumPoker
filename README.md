Neppo Scrum Poker
=====================

## Api Restful

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

#### Rota para Registro de Usuário

- Registro
{POST} /api/v1/auth/register
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

#### Rotas para Autenticação e Checagem

- Autenticação
{POST} /api/v1/auth/login
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
{GET} /api/v1/auth/protected
```bash
HEADER: {
    Authorization: JWT <token>
}
```

## Usuários

Sempre enviar o Header: `Authorization: JWT <token>`

#### Listar todos usuários cadastrados
```bash
{GET} /api/v1/user
```

- Para ordernar a busca por determinada key, acrescente o parametro `orderBy=NOME_DA_KEY` na url. Ex.: `http:\\meusite.com/api/v1/user/?orderBy=email`

- Para ordernar a busca em Ascendente ou Descendente, acrescente o parametro `sort=asc` para ordenar em Ascendente ou `sort=desc` para ordenar em Descendente.. Ex.: `http:\\meusite.com/api/v1/user/?orderBy=email&sort=asc`

- Para limitar a quantidade de documentos a ser mostrado após a consulta, acrescente o parametro `limit=QUANTIDADE`. Ex.: `http:\\meusite.com/api/v1/user/?limit=2`, neste caso irá mostrar somente 2 documentos.

- Para trazer apenas algumas keys do documento, acrescente o parametro `select=KEY1 KEY2`. Ex.: `http:\\meusite.com/api/v1/user/?select=_id email`. Pode ser informada várias key desde que cada uma tenha um espaço entre elas.

- Para buscar usuários, por determinada key do documento, acrescente o parametro `key=NOME_KEY&text=TEXTO_KEY`. Ex.: `http:\\meusite.com/api/v1/user/?key=department&text=Desenvolvedor`.

#### Listar determinado usuário
```bash
{GET} /api/v1/user/:id_user
```

- Para trazer apenas algumas keys do documento, acrescente o parametro `select=KEY1 KEY2`. Ex.: `http:\\meusite.com/api/v1/user/?select=_id email`. Pode ser informada várias key desde que cada uma tenha um espaço entre elas.

## Projetos

Sempre enviar o Header: `Authorization: JWT <token>`

#### Cadastrar
```bash
{POST} /api/v1/project
```

#### Atualizar
```bash
{PUT} /api/v1/project/:id_project
```

#### Deletar
Para deletar um projeto:
```bash
{DELETE} /api/v1/project/:id_project
```

Para deletar uma key de um projeto:
```bash
{DELETE} /api/v1/project/:id_project/?key=NOME_DA_KEY
```

Obs.: Somente quem cadastrou o projeto pode deleta-lo ou deletar uma key

#### Listar projetos cadastrados
```bash
{GET} /api/v1/project
```

- Para verificar se o usuário pertence a equipe do projeto, acrescente o parametro 
`userTeam=true` na url. Isso fará com que todos os projetos, que o usuário pertence, sejam mostrado ao usuário. Ex.: `http:\\meusite.com/api/v1/project/?userTeam=true`

- Para ordernar a busca por determinada key, acrescente o parametro `orderBy=NOME_DA_KEY` na url. Ex.: `http:\\meusite.com/api/v1/project/?orderBy=title`

- Para ordernar a busca em Ascendente ou Descendente, acrescente o parametro `sort=asc` para ordenar em Ascendente ou `sort=desc` para ordenar em Descendente.. Ex.: `http:\\meusite.com/api/v1/project/?orderBy=title&sort=asc`

- Para limitar a quantidade de documentos a ser mostrado após a consulta, acrescente o parametro `limit=QUANTIDADE`. Ex.: `http:\\meusite.com/api/v1/project/?limit=2`, neste caso irá mostrar somente 2 documentos.

- Para trazer apenas algumas keys do documento, acrescente o parametro `select=KEY1 KEY2`. Ex.: `http:\\meusite.com/api/v1/project/?select=_id title`. Pode ser informada várias key desde que cada uma tenha um espaço entre elas.

- Para buscar projetos, por determinada key do documento, acrescente o parametro `key=NOME_KEY&text=TEXTO_KEY`. Ex.: `http:\\meusite.com/api/v1/project/?key=title&text=Teste`.

#### Listar determinado projeto
```bash
{GET} /api/v1/project/:id_project
```

- Para verificar se o usuário pertence a equipe do projeto, acrescente o parametro 
`?userTeam=true` na url. Isso fará com que o projeto seja mostrado ao usuário. Ex.: `http:\\meusite.com/api/v1/project/?userTeam=true`

- Para trazer apenas algumas keys do documento, acrescente o parametro `select=KEY1 KEY2`. Ex.: `http:\\meusite.com/api/v1/project/?select=_id title`. Pode ser informada várias key desde que cada uma tenha um espaço entre elas.


## Estórias

Sempre enviar o Header: `Authorization: JWT <token>`

#### Cadastrar
```bash
{POST} /api/v1/story/:id_project
```

#### Atualizar
```bash
{PUT} /api/v1/story/:id_project/:id_story
```

#### Deletar
Para deletar um projeto:
```bash
{DELETE} /api/v1/story/::id_project/:id_story
```

Para deletar uma key de um projeto:
```bash
{DELETE} /api/v1/story/:id_project/:id_story/?key=NOME_DA_KEY
```

#### Listar estórias de um determinado projeto
```bash
{GET} /api/v1/story/:id_project
```

- Para ordernar a busca por determinada key, acrescente o parametro `orderBy=NOME_DA_KEY` na url.

- Para ordernar a busca em Ascendente ou Descendente, acrescente o parametro `sort=asc` para ordenar em Ascendente ou `sort=desc` para ordenar em Descendente.

- Para limitar a quantidade de documentos a ser mostrado após a consulta, acrescente o parametro `limit=QUANTIDADE`.

- Para trazer apenas algumas keys do documento, acrescente o parametro `select=KEY1 KEY2`. Pode ser informada várias key desde que cada uma tenha um espaço entre elas.

- Para buscar estórias, por determinada key do documento, acrescente o parametro `key=NOME_KEY&text=TEXTO_KEY`.

#### Listar determinada estória de um projeto
```bash
{GET} /api/v1/story/:id_project/:id_story
```

- Para trazer apenas algumas keys do documento, acrescente o parametro `select=KEY1 KEY2`. Pode ser informada várias key desde que cada uma tenha um espaço entre elas.
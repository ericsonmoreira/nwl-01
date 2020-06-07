# Next Level Week

Esse é o backend da aplicação que será desenvolvida na #NLW. O nome da aplicação é EColeta - uma aplicação para cadastramente de coletores recicláveis.

## Entidades da aplicação

- points: pontos de coleta
  - image
  - name
  - email
  - whatsapp
  - latitude
  - longitude
  - city
  - uf
- itens: itens que podem ser coletados.
  - title
  - image
- point_itens
  - point_id
  - item_id

## Comandos importantes

Rodar o servidor:

```bash
npm run dev
```

Criando as tabelas com Knex:

```bash
npx knex migrate:latest --knexfile knexfile.ts migrate:latest
```

Criando as tabelas com Knex de forma reduzida:

```bash
npm run knex:migrate
```

## Anotações

- Rota: Endereço completo da requisição.
- Recurso: Qual entidade estamos acessando do sistema.
- GET: buscar uma ou mais informações do backend.
- POST: criar uma nova informação no backend.
- PUT: atualizar uma informação já existente no backend.
- DELETE: remover uma informação do backend.
- POST localhost:3333/users --> Criar um novo usuário.
- GET localhost:3333/users --> Listar usurários.
- GET localhost:3333/users/5 --> Buscar dados do usuário de id 5.
- Request Param: são parametros que vem na própria rota que identificam um recurso.
- Query Param: são paramentros que vem na própria rota, geramente opicionais, para filto, paginação, etc...
- Request Bory: são parametros para criação e atualuzação de informações.
- Migrations: histórico do banco de dados.

## Libs utilizadas

- [Express](https://expressjs.com/pt-br/): O Express é um framework para aplicativo da web do Node.js.
- [Knex](http://knexjs.org/): O Knex.js é um construtor de consultas SQL com "batteries included" para Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle e Amazon Redshift, projetado para ser flexível, portátil e divertido de usar.
- [Sqlite3](https://www.sqlite.org/index.html): Database.
- [Cors](https://www.npmjs.com/package/cors): O CORS é um pacote node.js para fornecer um middleware do Connect/Express que pode ser usado para ativar o CORS com várias opções.
- [Multer](https://github.com/expressjs/multer): Multer é um middleware node.js para lidar com dados/formulário de várias partes, usado principalmente para o upload de arquivos.
- [Celebrate](https://github.com/arb/celebrate): A joi validation middleware for Express.

## Funcionalidades

- Cadastro de um ponto de coleta
- Listar os itens de coleta
- Listar pontos de coleta (filtro por estado/cidade/itens)
- Listar um ponto de colera expecífico

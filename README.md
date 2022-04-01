<br/>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Descrição

Api para gestão de médicos.

## Instalação

```bash
$ npm install
```

## Executando o aplicativo

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Operações

- Insert
- Update
- Select
- Soft Delete

## Cadastro do médico

- Nome do médico
- CRM
- Telefone fixo
- Telefone celular
- CEP: (Ao cadastrar o CEP, e feita uma requisição via axios para a API ViaCEP e retorna a localidade do cliente já salvando automaticamente no db).
- Especialidade médica

## Cadastro de especialidades

- Titulo

## Tecnologias utilizadas

- NestJS
- TypeScript
- Sequelize
- axios
- class-validator
- MySQL

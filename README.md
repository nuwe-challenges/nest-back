<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <!-- <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p> -->

# Nest API

## Acerca del proyecto

Este proyecto es una API REST creada mediante NestJS, un framework basado en Express, que también puede ser iniciado como un servidor Fastify.

La idea original era crear un servidor Fastify, pero fue descartada debido a su incompatibilidad con los módulos de autentificación PassportJS, aun así los módulos para ser creado están instalados para realizar el cambio si es necesario.

Como resultado se ha usado un servidor ExpressJS como base.

## Glosario de tecnologias

- [NestJS](https://docs.nestjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [PassportJS](http://www.passportjs.org)
- [Json Web Token](https://jwt.io)
- [ExpressJS](https://expressjs.com/es/)
- [Fastify](https://www.fastify.io)
- [Mongoose](https://mongoosejs.com)
- [Jest](https://jestjs.io/es-ES/)
- [Supertest](https://github.com/visionmedia/supertest)
- [Mongo](https://www.mongodb.com/es)

## Installation

```bash
$ npm install
```

## Distribución de directorios

En NestJS, las rutas se crean al vuelo mediante el uso de Decorators(@) de clase; por ejemplo, la ruta **GET: /user/:id** sería:

```node
@Controller('user')
export class UserController {
  ...
  @Get(':id')
}
```

En cuanto a la distribución usada, se han creado 4 módulos sin contar los propios de NestJS (HttpModule, MongooseModule, ConfigModule...):

- AuthModule: Gestiona el módulo de Passport.
- MailingModule: Gestiona el service de mailing.
- CountryModule: Gestiona los registros de paises según una API externa.
- UsersModule: Gestiona el control de usuario, tanto datos personales como APIs referentes (Gitlab y GitHub).

Por defecto, cada módulo tiene sus propias lineas de lógica, una o varias, y funciones auxiliares según necesidad.

## Lógica de peticiones

Por defecto, las peticiones HTTP pasan los filtros de los Guards (middlewares en Express) y luego llegan al controller que, a su vez, llama a los services asociados necesarios que interactuarán con la base de datos activa.

Es posible llamar a services de módulos externos si se configura previamente en el módulo del solicitante.

En este proyecto se ha añadido otra capa de seguridad y filtrado usando DTOs (Data Transfer Objects) mapeadas a clases de validación restrictivas y sus Partials.

```node
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

Básicamente estas DTOs cortan cualquier petición sin llegar al controller si los datos enviados no cumplen con los filtros aplicados por los Decorators.

## Iniciando la API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## MailboxLayer API

Integración con la API en el módulo **MailingModule** mediante el módulo de peticiones asíncronas de NestJS.

## RESTCountries API

Integración con la API en el módulo **CountryModule** mediante el módulo de peticiones asíncronas de NestJS.

El service asociado tiene un hook que comprueba la existencia de registros previos del modelo de paises al iniciar el módulo pertinente.

Si no existen, se llama a la API y se introducen los datos en la base de datos asociada.

## Autentificación

La gestión de permiso de acceso a rutas se realiza por medio de Passport, actualmente se han implementado dos Strategies: Local y Jwt (con protocolo Bearer). Toda la configuración de Passport está en el módulo **AuthModule**.

## Modelos y bases de datos
Actualmente está implementada la persistencia de datos mediante MongoDB y Mongoose.

Para la integración con PostgreSQL sería necesario cambiar los services basados en Mongoose Schemas por clases TypeORM y las definiciones de tablas y claves pertinentes.

Esta última integración aún no está desarrollada.

## Vulnerabilidades
Nodemailer depende de módulos con versiones vulnerables.
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

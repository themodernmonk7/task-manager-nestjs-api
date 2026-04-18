Task Manager NestJs API

Auth:

1. Register user POST /api/register
2. Login user POST /api/login

Notes:

1. Create note POST /api/notes
2. Get all notes GET /api/notes
3. Get single note GET /api/notes/:id
4. Update note PATCH /api/notes/:id
5. Delete note DELETE /api/notes/:id

- To create a Nest application instance, we use the core NestFactory class.
- NestFactory exposes a few static methods that allow creating an application instance.
  The create() method returns an application object, which fulfills the INestApplication interface.

## Controllers

- Controllers are responsible for handling incoming requests and sending responses back to the client.
- A controller's purpose is to handle specific requests for the application. The routing mechanism determines which controller will handle each request. Often, a controller has multiple routes, and each route can perform a different action.

### Request payloads

- We need to define the DTO (Data Transfer Object) schema.
- A DTO is an object that specifies how data should be sent over the network. We could define the DTO schema using TypeScript interfaces or simple classes. However, we recommend using classes here. Why? Classes are part of the JavaScript ES6 standard, so they remain intact as real entities in the compiled JavaScript.
- In contrast, TypeScript interfaces are removed during transpilation, meaning Nest can't reference them at runtime. This is important because features like Pipes rely on having access to the metatype of variables at runtime, which is only possible with classes.
- Why not use TypeScript interfaces?
  - Because:
    - Interfaces exist only in TypeScript, for development.
    - When your code is compiled to JavaScript:
      - Interfaces disappear. There is no trace of CreateUserDto in the JS output.
      - They don't exist at runtime.
      - So NestJS cannot check types, cannot validate, and cannot use decorators like @IsString().
- Why use classes?
  - Because:
    - Classes exist in both TypeScript AND JavaScript.
    - When compiled to JavaScript, the class still exists.
    - NestJS features like Validation Pipes need an actual class at runtime to know:
      - what type of data is expected,
      - and how to validate it.

## Modules

- A module is a class that is annotated with the @Module() decorator. This decorator provides metadata that Nest uses to organize and manage the application structure efficiently.

## Pipes

- A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.
- Pipes in NestJS work on the data right before it reaches your controller method.

- When a request comes in:
  1.  NestJS takes the request data.
  2.  Before calling your controller method, NestJS runs the data through a pipe.
  3.  The pipe can:
  - check/validate the data
  - change/transform the data
  4. After the pipe finishes, the controller method is called with the cleaned or transformed data.

Request Flow
USER -> MIDDLEWARE -> ROUTES -> CONTROLLERS -> SERVICES -> DATABASE -> RESPONSE TO END USER

- In NestJs [MIDDLEWARE -> ROUTES -> CONTROLLERS -> SERVICES] is a Module

What is decorator?

What is private readonly?
By adding the access modifier (`private`) directly in the constructor arguments, TypeScript automatically:

1.  **Declares** a property on the class with that name.
2.  **Assigns** the value passed into the constructor to that property.

### Why use it?

In NestJS, this is the primary way **Dependency Injection** works. You are telling Nest: \_"I need an instance of `AppService`. Please find it, inject it here, and make sure I can use it anywhere in this class, but don't let anyone else touch it or change it."

### Prisma Client

- Prisma Client is a type-safe database client that's generated from your Prisma model definition. Because of this approach, Prisma Client can expose CRUD operations that are tailored specifically to your models.
- To generate the prisma client run this command: `npx prisma generate`
- To migrate `npx prisma migrate dev --name init`

## Volumes in Docker

- In Docker, Volumes are the mechanism used to persist data. Without a volume, a database container is like a "Reset" button—every time you stop or delete the container, all your data (users, tasks, tables) disappears forever.

#### The Problem: Ephemeral Containers

By default, files created inside a container are stored on a writable container layer.

- You start the Postgres container.
- You create a "User" table and add 10 rows.
- You run docker-compose down.
- The data is gone. The next time you start it, you have a blank database.

#### The Solution: Volumes (The "External Hard Drive")

- A volume is a dedicated folder on your actual computer's hard drive that is "mounted" (mapped) into the container.

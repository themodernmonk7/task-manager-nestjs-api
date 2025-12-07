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

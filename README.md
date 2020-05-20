# [Deno](https://deno.land/)

A **JavaScript / TypeScript runtime** based on the V8 Javascript engine and the **Rust** programming language

- [Deno Crash Course-Traversy Media](https://www.youtube.com/watch?v=NHHhiqwcfRM)

## 1. powershell 관리자권한으로 실행.

```powershell
# Run as administrator:
> $env:DENO_INSTALL = "C:\Program Files\deno"

> iwr https://deno.land/x/install/install.ps1 -useb | iex
```

## 2. VSC extension : Deno

## 3. Getting Started

```sh
> deno
Deno 1.0.0
exit using ctrl+d or close()

> 1+2
3

```

Try running a simple program:

```sh
> deno run https://deno.land/std/examples/welcome.ts
Welcome to Deno �🦕

```

## 4. Hello World

```ts
// simpleServer.ts
import { serve } from 'https://deno.land/std/http/server.ts';
const s = serve({ port: 8000 });
console.log('http://localhost:8000/');
for await (const req of s) {
	req.respond({ body: 'Hello World\n' });
}
```

```sh
> deno run --allow-net simpleServer.ts
http://localhost:8000/
```

## Security Flags

| Function name   | Description                            |
| --------------- | -------------------------------------- |
| --allow-write   | Allow Write access                     |
| --allow-read    | Allow Read system access               |
| --allow-network | Allow Network access                   |
| --allow-env     | Allow Environment access               |
| --allow-plugin  | Allow Loading plugins                  |
| --allow-hrtime  | Allow High resolution time measurement |
| --allow-run     | Allow Subprocess                       |
| -A              | Allow all permissions                  |

```ts
// C:\DEV\deno-tutorial\main.ts
console.log(Deno.cwd());
```

```sh
> deno run --allow-read main.ts
C:\DEV\deno-tutorial
```

## De-Centralized Packages

- no more NPM packages / package.json
- Packages are imported from a URL - https://deno.land/x/

```ts
import { Application } from 'https://deno.land/x/oak/mod.ts';
```

## Standard Library

- Extensive standard library for things like fs, datetime, http, etc

```ts
import { serve } from 'https://deno.land/std/http/server.ts';
```

## install Standard Library

```sh
> deno install --allow-net --allow-read https://deno.land/std/http/file_server.ts

> file_server
HTTP server listening on http://0.0.0.0:4507/
```

## typescript

```ts
// hello.ts
const greeting: string = 'hello world!';

console.log(greeting);
```

```sh
> deno run hello.ts
hello world!
```

```ts
const greeting: string = 1;

console.log(greeting);
```

```sh
> deno run hello.ts
error: TS2322 [ERROR]: Type '1' is not assignable to type 'string'.
const greeting: string = 1;
      ~~~~~~~~
    at file:///C:/DEV/deno-tutorial/hello.ts:1:7
```

## standard library - datetime

```ts
import {
	dayOfYear,
	currentDayOfYear,
} from 'https://deno.land/std/datetime/mod.ts';

console.log(dayOfYear(new Date('2020-02-02')));
console.log(currentDayOfYear());
```

```sh
> deno run dateTime.ts
Compile file:///C:/DEV/deno-tutorial/dateTime.ts
33
141
```

## runtime api - createFile

```ts
const encoder = new TextEncoder();

const greetText = encoder.encode('hello world\nmy name is ju');

await Deno.writeFile('greet.txt', greetText);
```

```sh
> deno run --allow-write createFile.ts
Compile file:///C:/DEV/deno-tutorial/createFile.ts
```

```ts
// greet.txt
hello world
my name is ju
```

## runtime api - ReadFile

```ts
let file = await Deno.open('greet.txt');
await Deno.copy(file, Deno.stdout);
file.close();
```

```sh
> deno run --allow-read readFile.ts
Compile file:///C:/DEV/deno-tutorial/readFile.ts
hello world
my name is ju
```

# [Third Party Modules](https://deno.land/x) example

## oak

```ts
// server.ts
import { Application } from 'https://deno.land/x/oak/mod.ts';
import router from './routes.ts';

const port = 5000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${port}`);

await app.listen({ port });

// routes.ts
import { Router } from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

router.get('/api/v1/products', ({ response }: { response: any }) => {
	response.body = 'hello world';
});

export default router;
```

- extensions : REST Client

```ts
GET http://localhost:5000/api/v1/products

HTTP/1.1 200 OK
content-length: 11
content-type: text/plain; charset=utf-8

hello world
```

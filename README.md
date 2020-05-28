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

- **`GET`** - /todos
- **`POST`** - /todos (form data)
- **`PUT`** - /todos/:id (form data)
- **`DELETE`** - /todos/:id

** run **

```sh
example/oak > deno run --allow-net server.ts
```

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

## qrcode

```ts
// sample.js
await fetch('https://jsonplaceholder.typicode.com/todos/1')
	.then((res) => res.json())
	.then((data) => console.log(data));
```

```sh
> deno fmt

C:\DEV\deno-tutorial\example\qrcode\sample.js

> deno run --allow-net sample.js

{ userId: 1, id: 1, title: "delectus aut autem", completed: false }

> deno run --allow-net=jsonplaceholder.typicode.com sample.js

{ userId: 1, id: 1, title: "delectus aut autem", completed: false }
```

```ts
window.addEventListener('load', () => {
	console.log('loaded');
});

window.addEventListener('unload', () => {
	console.log('unloaded');
});

await fetch('https://jsonplaceholder.typicode.com/todos/1')
	.then((res) => res.json())
	.then((data) => console.log(data));
```

```sh
> deno run --allow-net=jsonplaceholder.typicode.com sample.js

loaded
{ userId: 1, id: 1, title: "delectus aut autem", completed: false }
unloaded
```

```ts
import { qrcode } from 'https://deno.land/x/qrcode/mod.ts';

const imageSrc = await qrcode(Deno.args[0]);

// console.log(imageSrc);

Deno.writeTextFile('qrcode.html', `<img src="${imageSrc}" />`);
```

```sh
> deno run --allow-write sample.js test
```

### test

```ts
// sample.js
export function sum(a, b) {
	return a + b;
}

// sample.test.js
import { sum } from './sample.js';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

Deno.test('Testing sum', () => {
	assertEquals(sum(1, 2), 3);
});
```

```sh
> deno test

running 1 tests
test Testing sum ... ok (3ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (3ms)
```

### non breaking code

```ts
// deps.js
export { assertEquals } from 'https://deno.land/std@0.51.0/testing/asserts.ts';

// sample.test.js
import { sum } from './sample.js';
import { assertEquals } from './deps.js';

Deno.test('Testing sum', () => {
	assertEquals(sum(1, 2), 3);
});
```

```ts
// deps.js
export { assertEquals } from 'https://deno.land/std@0.52.0/testing/asserts.ts';

// sample.test.js
import { sum } from './sample.js';
import { assertEquals } from './deps.js';

Deno.test('Testing sum', () => {
	assertEquals(sum(1, 2), 3);
});
```

### download library

```ts
// library.js
export default function print(arg) {
	return console.log(arg);
}

// sample.js
import print from './library.js';

print('hi');
```

```sh
> deno run sample.js

hi
```

library.js > live server

```ts
// sample.js
import print from 'http://127.0.0.1:5500/example/qrcode/library.js';

print('hi');
```

```sh
> deno run sample.js

Download http://127.0.0.1:5500/example/qrcode/library.js
hi
```

### lock

```sh
> deno cache --lock=lock.json --lock-write sample.js
```

```ts
// lock.json
{
  "http://127.0.0.1:5500/example/qrcode/library.js": "03a2d104d77fba6344e6a52e3105c7cc0b3272d75dfdaa05e92eca452231bf2f"
}

```

### reload

```sh
> deno cache --lock=lock.json sample.js

> deno cache --reload --lock=lock.json sample.js

Download http://127.0.0.1:5500/example/qrcode/library.js
```

```ts
// library.js
export default function print(arg) {
	return console.log(arg + 'v2');
}
```

- 위에서 library.js에 변화가 생겼기때문에 아래와같이 check failed
- 저장된 lock.json과 다른점이 있다는것은 변조 파일이 있다는것

```sh
> deno cache --reload --lock=lock.json sample.js

Download http://127.0.0.1:5500/example/qrcode/library.js
Subresource integrity check failed --lock=lock.json
http://127.0.0.1:5500/example/qrcode/library.js
```

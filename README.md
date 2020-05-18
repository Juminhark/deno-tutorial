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
// server.ts
import { serve } from 'https://deno.land/std@0.50.0/http/server.ts';
const s = serve({ port: 8000 });
console.log('http://localhost:8000/');
for await (const req of s) {
	req.respond({ body: 'Hello World\n' });
}
```

```sh
> deno run --allow-net server.ts
http://localhost:8000/
```

## --allow-read

```ts
// C:\DEV\deno-tutorial\main.ts
console.log(Deno.cwd());
```

```sh
> deno run --allow-read main.ts
C:\DEV\deno-tutorial
```

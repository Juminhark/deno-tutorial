import pogo from 'https://deno.land/x/pogo/main.ts';

const server = pogo.server({ port: 3000 });

console.log('http://localhost:3000/');

server.router.get('/', () => {
	return 'Hello, world! <a href="/post">post</a>';
});

server.router.get('/post', () => {
	return 'hello';
});

server.start();

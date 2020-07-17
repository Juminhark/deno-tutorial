import { graphql, buildSchema } from 'https://cdn.pika.dev/graphql/^15.0.0';
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var resolver = { hello: () => 'Hello world!' };

const executeSchema = async (query: any) => {
	const result = await graphql(schema, query, resolver);
	return result;
};

var router = new Router();

router.post('/graph', async ({ request, response }) => {
	if (request.hasBody) {
		const body = await request.body();
		const result = await executeSchema(body.value);
		response.body = result;
	} else {
		response.body = 'Query Unknown';
	}
});

let app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
console.log('Server running');
app.listen({ port: 5000 });

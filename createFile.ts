const encoder = new TextEncoder();

const greetText = encoder.encode('hello world\nmy name is ju');

await Deno.writeFile('greet.txt', greetText);

import { qrcode } from 'https://deno.land/x/qrcode/mod.ts';

const imageSrc = await qrcode(Deno.args[0]);

console.log(imageSrc);

Deno.writeTextFile('qrcode.html', `<img src="${imageSrc}" />`);

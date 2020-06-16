import { sum, print } from "./library.js";
import { assertEquals } from "./deps.js";

Deno.test("Testing sum", () => {
  assertEquals(sum(1, 2), 3);
});

Deno.test("Print library function", () => {
  print("hi");
});

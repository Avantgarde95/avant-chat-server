import { generatePasswordHash, verifyPassword } from "utils/PasswordUtils";

test("Generate password hash", async () => {
  const { passwordHash, salt } = await generatePasswordHash("hello", () => "abc");

  expect(passwordHash.startsWith("c1b77ae")).toEqual(true);
  expect(salt).toEqual("abc");
});

test("Verify the given password", async () => {
  const { passwordHash, salt } = await generatePasswordHash("hello");

  expect(await verifyPassword("hello", passwordHash, salt)).toEqual(true);
  expect(await verifyPassword("helo", passwordHash, salt)).toEqual(false);
});

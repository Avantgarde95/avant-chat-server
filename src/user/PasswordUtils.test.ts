import { generatePasswordHash, verifyPassword } from "user/PasswordUtils";

test("Generate password hash", async () => {
  const { passwordHash, passwordSalt } = await generatePasswordHash("hello", () => "abc");

  expect(passwordHash.startsWith("c1b77ae")).toEqual(true);
  expect(passwordSalt).toEqual("abc");
});

test("Verify the given password", async () => {
  const { passwordHash, passwordSalt } = await generatePasswordHash("hello");

  expect(await verifyPassword("hello", passwordHash, passwordSalt)).toEqual(true);
  expect(await verifyPassword("helo", passwordHash, passwordSalt)).toEqual(false);
});

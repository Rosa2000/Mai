import { createUser } from "../../controller/database/userController.mjs";
import { encryptText } from "../../middleware/signUpHelper.mjs";
const password = await encryptText("abcdef");

await createUser("0773053503", password, "ADMIN", "ADMIN");

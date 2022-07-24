import { default as bcrypt } from "bcryptjs";

export function encryptText(password) {
  return bcrypt.hash(password, 10);
}

export function validatePhoneNumber(phoneNumber) {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (phoneNumber.match(regex)) return true;
  else return false;
}

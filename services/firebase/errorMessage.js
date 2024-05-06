export function getErrorMessage(err) {
  console.log({ err });
  if (err.code === "auth/invalid-credential") {
    return "Invalid Credentials, please try again";
  } else if (err.code === "auth/invalid-email") {
    return "Invalid Email, please try again";
  }
  return "Something went wrong, please try again";
}

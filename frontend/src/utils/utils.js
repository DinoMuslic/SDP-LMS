export const capitalizeFirstLetter = (val) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export const validateRegisterForm = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (!firstName) errors.firstName = "First Name is required";
  if (!lastName) errors.lastName = "Last Name is required";
  if (!email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
  if (!password) errors.password = "Password is required";
  else if (password.length < 8)
    errors.password = "Password must be at least 8 characters";
  if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  return errors;
};

export const getBaseUrl = () => {
  console.log(import.meta.env.VITE_API_URL);
  return import.meta.env.VITE_API_URL;
}

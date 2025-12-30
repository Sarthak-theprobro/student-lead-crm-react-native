export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/[^0-9]/g, ""));
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateForm = (formData) => {
  const errors = {};

  if (!validateRequired(formData.name)) {
    errors.name = "Name is required";
  }

  if (!validateEmail(formData.email)) {
    errors.email = "Invalid email address";
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = "Invalid phone number (10 digits required)";
  }

  if (!validateRequired(formData.course)) {
    errors.course = "Course is required";
  }

  if (!formData.status) {
    errors.status = "Status is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

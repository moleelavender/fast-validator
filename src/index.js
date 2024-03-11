const _ = require('lodash');
const validator = require('validator');
const yup = require('yup');
const emailValidator = require('email-validator');
const Joi = require('joi');
const moment = require('moment');

// Define a basic schema interface using Yup for simplicity
const createSchema = (schemaDefinition) => yup.object().shape(schemaDefinition);

// Extend yup with custom validations
yup.addMethod(yup.string, 'isFutureDate', function (errorMessage) {
  return this.test('isFutureDate', errorMessage, function (value) {
    const { path, createError } = this;
    return moment(value).isAfter(moment()) || createError({ path, message: errorMessage });
  });
});

// Utilize Joi for complex validations when needed
const validateWithJoi = (schema, data) => {
  const { error } = Joi.validate(data, schema);
  return error ? error.details.map(detail => detail.message) : null;
};

// Example validation functions using the dependencies
const validateEmail = (email) => {
  return emailValidator.validate(email) ? null : 'Invalid email format.';
};

const validateStringLength = (string, { min = 0, max = 255 } = {}) => {
  if (!validator.isLength(string, { min, max })) {
    return `String must be between ${min} and ${max} characters long.`;
  }
  return null;
};

// Exporting a function to validate data against a schema
exports.validate = (data, schema) => {
  try {
    schema.validateSync(data, { abortEarly: false });
    return { isValid: true, errors: [] };
  } catch (error) {
    return { isValid: false, errors: error.errors };
  }
};

// Example usage of custom and Joi validation
exports.validateCustomRules = (data, rules) => {
  const errors = rules.map(rule => rule(data)).filter(error => error !== null);
  return { isValid: errors.length === 0, errors };
};

// Providing a simple API to create and validate data against schemas
exports.createValidator = (schemaDefinition) => {
  const schema = createSchema(schemaDefinition);
  return {
    validate: (data) => exports.validate(data, schema),
    validateCustom: (data, rules) => exports.validateCustomRules(data, rules),
  };
};

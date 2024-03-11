# fast-validator

Simple and fast data validation library for forms and JSON data, supporting a variety of common validation needs.

## Installation

To install fast-validator, run the following command in your project directory:

```
npm install fast-validator
```

## Features

- Easy to integrate and use with forms or JSON data.
- Supports common validations like required fields, string lengths, numerical ranges, and email formats.
- Custom validation rules for complex validation scenarios.
- Utilizes popular libraries like `yup`, `validator`, `Joi`, and `email-validator` for comprehensive validation options.

## Getting Started

### Defining a Schema

First, define a validation schema for your data:

```javascript
const { createValidator } = require('fast-validator');

const userSchema = {
name: yup.string().required('Name is required'),
email: yup.string().email('Invalid email').required('Email is required'),
birthdate: yup.string().isFutureDate('Birthdate cannot be in the future'),
};
```

### Validating Data

Once you have a schema, you can validate data against it:

```javascript
const validator = createValidator(userSchema);

const result = validator.validate({
name: 'John Doe',
email: 'john.doe@example.com',
birthdate: '1990-01-01',
});

console.log(result);
```

This will output:

```
{ isValid: true, errors: [] }
```

### Custom Validations

For custom validations, you can use the `validateCustom` method:

```javascript
const customRules = [
(data) => data.age < 18 ? 'Must be 18 or older' : null,
];

const customResult = validator.validateCustom(userData, customRules);

console.log(customResult);
```

## API Reference

### `createValidator(schemaDefinition)`

- `schemaDefinition`: Object defining the validation schema using `yup` syntax.
- Returns an object with `validate` and `validateCustom` methods for validating data.

### `validate(data, schema)`

- Validates data against the provided schema.
- `data`: Object containing the data to validate.
- `schema`: Validation schema object.
- Returns an object with `isValid` and `errors` properties.

### `validateCustom(data, rules)`

- Validates data against custom validation rules.
- `data`: Object containing the data to validate.
- `rules`: Array of custom validation functions.
- Returns an object with `isValid` and `errors` properties.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any features or improvements.

## License

ISC

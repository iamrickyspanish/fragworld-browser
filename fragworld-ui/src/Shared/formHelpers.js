import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);

const mapAjvErrorsToFormErrors = (ajvErrors) => {
  return ajvErrors.reduce((obj, error) => {
    const key = error.instancePath.split("/").pop();
    return {
      ...obj,
      [key]: obj[key] ? `${error.message} ${obj[key].message}` : error.message
    };
  }, {});
};

export const createGetValidateProps = (schema) => (attributeName) => {
  const validate = (_value, values) => {
    const valid = ajv.validate(schema, values);
    return valid
      ? undefined
      : mapAjvErrorsToFormErrors(ajv.errors)[attributeName];
  };
  return {
    validate,
    name: attributeName
  };
};

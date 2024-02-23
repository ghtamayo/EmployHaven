const validationFormResult = (body, validationResult) => {
  if (!body) return [];

  if (!validationResult) return [];

  const properties = Object.keys(body);
  let result = properties.map((prop) => {
    let error = validationResult.find((element) => element.path === prop);
    if (error) {
      return { body: prop, msg: error.msg };
    } else {
      return { body: prop, msg: null };
    }
  });
  return result;
};

export const startUpper = (str) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default validationFormResult;

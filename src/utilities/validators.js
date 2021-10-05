const includePropValidation = (obj, props) => {
  let isIncludeAll = true;
  let missingParams = [];
  props.forEach((prop) => {
    if (!obj.hasOwnProperty(prop)) {
      isIncludeAll = false;
      missingParams.push(prop);
    }
  });

  if (!isIncludeAll) throw new createError(409, "Object missing field");
};

module.exports = {
  includePropValidation,
};

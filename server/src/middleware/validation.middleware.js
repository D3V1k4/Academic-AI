module.exports = (schema) => {
  return (req, res, next) => {
    if (!schema) return next();

    // Check body, query, and params
    const errors = [];
    const fieldsToValidate = { ...req.body, ...req.query, ...req.params };

    for (const [field, validators] of Object.entries(schema)) {
      const val = fieldsToValidate[field];

      if (validators.required && (val === undefined || val === null || val === "")) {
        errors.push(`${field} is required`);
        continue;
      }

      if (val !== undefined && val !== null) {
        if (validators.type && typeof val !== validators.type) {
          if (validators.type === "number" && !isNaN(val)) {
            // allow coerced numbers
            continue;
          }
          errors.push(`${field} must be of type ${validators.type}`);
        }
        
        if (validators.min !== undefined && val < validators.min) {
          errors.push(`${field} must be at least ${validators.min}`);
        }

        if (validators.max !== undefined && val > validators.max) {
          errors.push(`${field} must be at most ${validators.max}`);
        }

        if (validators.enum && !validators.enum.includes(val)) {
          errors.push(`${field} must be one of: ${validators.enum.join(", ")}`);
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors
      });
    }

    next();
  };
};

export const successResponse = (res, message, data) => {
  res.status(200).json({ message, data });
};

export const errorResponse = (res, message, code = 400) => {
  res.status(code).json({ error: message });
};

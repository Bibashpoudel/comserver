export const editFileName = (req, file, callback) => {
  const fileExtName = file.originalname;

  callback(null, `${new Date()}-${fileExtName}`);
};

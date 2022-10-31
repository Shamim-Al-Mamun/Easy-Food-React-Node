const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};
const comparePassword = async (password, userPassword) => {   
  return await bcrypt.compare(password, userPassword); 
};
module.exports = {
  hashPassword,
  comparePassword, 
};   

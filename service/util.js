const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
exports.addSalt = (val) => {
  return new Promise(resolve => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) {
        resolve(val);
      }
      bcrypt.hash(val, salt, (err, hash) => {
        if (err) {
          resolve(val);
        }
        resolve(hash);
      });
    });
  });
}
exports.comparePassword = (_password, password) => {
  return new Promise(resolve => {
    bcrypt.compare(_password, password, (err, isMatch) => {
      if (!err) {
        resolve(isMatch)
      } else {
        reject(err)
      }
    })
  })
}

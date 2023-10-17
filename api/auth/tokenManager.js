
const userTokens = {};

function saveToken(token) {
  userTokens[token] = true;
}

function getToken(token) {
  return userTokens[token];
}

function removeToken(token) {
  delete userTokens[token];
}

module.exports = { saveToken, getToken, removeToken };

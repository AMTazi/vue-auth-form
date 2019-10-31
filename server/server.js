const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const logger = require("console");

const server = jsonServer.create();
const router = jsonServer.router("./db/products.json");

const userDb = JSON.parse(fs.readFileSync("./db/users.json", "UTF-8"));
var nextId = 3;
server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const SECRET_KEY = "123456789";
const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    userDb.users.findIndex(
      user => user.email === email && user.password === password
    ) !== -1
  );
}

function userExists(email) {
  return userDb.users.findIndex(user => user.email === email) !== -1;
}

function addUser(name, email, password) {
  userDb.users.push({id: nextId, name, email, password});

  fs.writeFileSync("./db/users.json", JSON.stringify(userDb));
  nextId++
}

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

server.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  if (userExists(email)) {
    const status = 422;
    const message = "User already exists with this email";
    res.status(status).json({ status, message });
    return;
  }
  addUser(name, email, password)
  const access_token = createToken({ email, password });
  res.status(200).json({ name, email, access_token });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  logger.log(req.headers.authorization);
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Bad authorization header";
    res.status(status).json({ status, message });
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(" ")[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = "Error: access_token is not valid";
    res.status(status).json({ status, message });
  }
});

server.use("/api", router);

const port = 5000;
const host = "127.0.0.1";
server.listen(port, host, () => {
  console.log(`Run Auth API Server http://${host}:${port}`);
});

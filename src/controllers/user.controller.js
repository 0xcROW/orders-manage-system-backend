import userService from '../services/user.service.js';

async function createUser(req, res) {
  const user = req.body;
  try {
    const token = await userService.createUser(user);
    res.status(201).send(token);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

//TODO login

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

async function getUserById(req, res) {
  const id = req.params.id;
  try {
    const user = await userService.getUserById(id);
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

async function getUserByEmail(req, res) {
  const email = req.params.email;
  try {
    const user = await userService.getUserByEmail(email);
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

async function getUserBySearch(req, res) {
  const query = req.query.q;
  try {
    const users = await userService.getUserBySearch(query);
    res.status(200).send(users);
  } catch (err) {
    res.status(500);
  }
}

async function updateUser(req, res) {
  const id = req.params.id;
  const user = req.body;
  try {
    const updatedUser = await userService.updateUser(id, user);
    res.status(200).send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    await userService.deleteUser(id);
    res.status(204).send({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

export default {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserBySearch,
  updateUser,
  deleteUser
};
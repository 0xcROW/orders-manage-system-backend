import usersRepository from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';

//TODO validate if :param is returning a error message if not found, instead of crashing the server
async function createUser(newUser) {
  const userExists = await usersRepository.getUserByEmail(newUser.email);
  if (userExists) {
    return { message: 'Usuário já cadastrado' };
  }
  //TODO generateJWT
  const pwhash = await bcrypt.hash(newUser.password, 10);
  const user = await usersRepository.createUser({ ...newUser, password: pwhash });
  if (!user) {
    return { message: 'Erro ao criar o usuário' };
  }
  return user;
}

async function getAllUsers() {
  return await usersRepository.getAllUsers();
}

async function getUserById(id) {
  const user = await usersRepository.getUserById(id);
  if (!user) {
    return { message: 'Usuário não encontrado' };
  };
  return user;
}

async function getUserByEmail(email) {
  if (!email) {
    return { message: 'Email não informado' };
  }
  const user = await usersRepository.getUserByEmail(email);
  if (!user) {
    return { message: 'Usuário não encontrado' };
  };
  return user;
}

async function getUserBySearch(query) {
  if (!query) return await usersRepository.getAllUsers();
  return await usersRepository.getUserBySearch(query);
}

async function updateUser(id, user) {
  //TODO validate if updateUser information doesn't already exist in another user 
  const userExists = await usersRepository.getUserById(id);
  if (!userExists) {
    return { message: 'Usuário não encontrado' };
  }
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  const updatedUser = await usersRepository.updateUser(id, user);
  if (!updatedUser) {
    return { message: 'Erro ao atualizar o usuário' };
  }
  return updatedUser;
}

async function deleteUser(id) {
  const user = await usersRepository.getUserById(id);
  if (!user) {
    return { message: 'Usuário não encontrado' };
  }
  const deletedUser = await usersRepository.deleteUser(id);
  if (!deletedUser) {
    return { message: 'Erro ao deletar o usuário' };
  }
  return { message: 'Usuário deletado com sucesso' };
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
import usersRepository from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';
import { generateJWT } from './auth.service.js';

//TODO validate if :param is returning a error message if not found, instead of crashing the server
async function createUser(newUser) {
  const userExists = await usersRepository.getUserByEmail(newUser.email);
  if (userExists) {
    return { message: 'Usuário já cadastrado' };
  }
  const pwhash = await bcrypt.hash(newUser.password, 10);
  const user = await usersRepository.createUser({ ...newUser, password: pwhash });
  if (!user) {
    return { message: 'Erro ao criar o usuário' };
  }
  const token = generateJWT(user.id);
  return token;
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
  //TODO fix delete that is not returning a message if user is not found or when it is deleted
  const user = await usersRepository.getUserById(id);
  console.log(user);
  if (user === undefined) {
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
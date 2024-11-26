import jwt from 'jsonwebtoken';
import 'dotenv/config';
import usersRepository from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';

//TODO change expiresIn from 30d to 1h after project is done
export function generateJWT(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export async function login(email, password) {
  const user = await usersRepository.getUserByEmail(email);
  if (!user) {
    return { message: 'Usuário não encontrado' };
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { message: 'Senha incorreta' };
  }
  const token = generateJWT(user);
  return token;
}
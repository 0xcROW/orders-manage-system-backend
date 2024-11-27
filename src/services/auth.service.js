import jwt from 'jsonwebtoken';
import 'dotenv/config';
import usersRepository from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';

// Generate JWT token
export function generateJWT(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

// Login service
export async function loginService(email, password) {
  try {
    // Input validation
    if (!email || !password) {
      return { success: false, message: 'Email e senha são obrigatórios!' };
    }

    // Fetch user by email
    const user = await usersRepository.getUserByEmail(email);
    if (!user) {
      return { success: false, message: 'Usuário ou senha inválidos!' };
    }

    // Compare provided password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { success: false, message: 'Usuário ou senha inválidos!' };
    }

    // Generate and return JWT
    const token = generateJWT(user.id);
    return { success: true, token };
  } catch (error) {
    // Log and handle unexpected errors
    console.error('Login error:', error);
    return { success: false, message: 'Erro interno do servidor' };
  }
}

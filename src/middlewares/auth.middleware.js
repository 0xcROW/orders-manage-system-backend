import 'dotenv/config';
import jwt from 'jsonwebtoken';
import userService from '../services/user.service.js';

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // Check if the authorization header is present
    if (!authHeader) {
      return res.status(401).send({ message: 'Token não fornecido' });
    }

    // Split and validate token format
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
      return res.status(401).send({ message: 'Token mal formatado' });
    }

    const token = parts[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Token inválido' });
      }

      // Fetch the user based on the token's decoded ID
      const user = await userService.getUserById(decoded.id);
      if (!user || !user.id) {
        return res.status(403).send({ message: 'Não autorizado' });
      }

      // Attach user info to the request object for downstream handlers
      req.userId = user.id;

      next();
    });
  } catch (error) {
    // Catch and handle unexpected errors
    console.error('Authentication error:', error);
    return res.status(500).send({ message: 'Erro interno do servidor' });
  }
}

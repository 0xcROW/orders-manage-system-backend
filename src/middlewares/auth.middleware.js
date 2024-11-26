import 'dotenv/config';
import jwt from 'jsonwebtoken';
import userService from '../services/user.service.js';

export function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'Token não fornecido' });
  }

  const tokenSplit = token.split(' ');
  if (tokenSplit.length !== 2) {
    return res.status(401).send({ message: 'Token mal formatado' });
  }

  if (!/^Bearer$/i.test(tokenSplit[0])) {
    return res.status(401).send({ message: 'Token mal formatado' });
  }

  jwt.verify(tokenSplit[1], process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Token inválido' });
    }
    const user = await userService.getUserById(decoded.id);
    if (!user || !user.id) {
      return res.status(403).send({ message: 'Não autorizado' });
    }

    req.userId = user.id;
    next();
  });
}
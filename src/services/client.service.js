import clientsRepository from '../repositories/clients.repository.js';
// import bcrypt from 'bcrypt';

async function createClient(client) {
  // if (!client.password) {
  //   throw new Error('Password is required');
  // }
  // Check if email is already in use
  // if (await clientsRepository.getClientByEmail(client.email)) {
  //   throw new Error('Email already in use');
  // }
  // Check if user already exists
  // if (await clientsRepository.getClientByEmail(client.email)) {
  //   throw new Error('Client already exists');
  // }
  // const passwordHash = await bcrypt.hash(client.password, 10);
  return clientsRepository.createClient({ ...client });
}

export default { createClient };
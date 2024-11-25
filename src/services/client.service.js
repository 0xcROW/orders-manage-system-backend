import clientsRepository from '../repositories/clients.repository.js';

async function createClient(client) {
  if (await clientsRepository.getClientByEmail(client.email)) {
    throw new Error('Email já cadastrado!');
  }
  if (await clientsRepository.getClientByDocument(client.document)) {
    throw new Error('Cliente já cadastrado!');
  }
  return await clientsRepository.createClient({ ...client });
}

async function getAllClients() {
  return await clientsRepository.getAllClients();
}

async function getClientById(id) {
  if (!id) {
    throw new Error('ID é obrigatório!');
  }
  const client = await clientsRepository.getClientById(id);
  if (!client) {
    throw new Error('Cliente não encontrado!');
  }
  return client;
}

async function getClientByEmail(email) {
  const client = await clientsRepository.getClientByEmail(email);
  if (!client) {
    throw new Error('Cliente não encontrado!');
  }
  return client;
}

async function getClientByDocument(document) {
  const client = await clientsRepository.getClientByDocument(document);
  if (!client) {
    throw new Error('Cliente não encontrado!');
  }
  return client;
}

async function updateClient(id, client) {
  const hasClient = await clientsRepository.getClientById(id);
  if (!hasClient) {
    throw new Error('Cliente não encontrado!');
  }
  if (await clientsRepository.getClientByEmail(client.email)) {
    throw new Error('Email já cadastrado!');
  }
  if (await clientsRepository.getClientByDocument(client.document)) {
    throw new Error('Cliente já cadastrado!');
  }
  const updatedClient = await clientsRepository.updateClient(id, client);
  return updatedClient;
}

async function deleteClient(id) {
  const client = await clientsRepository.getClientById(id);
  if (!client) {
    throw new Error('Cliente não encontrado!');
  }
  await clientsRepository.deleteClient(id);
  return { message: 'Cliente removido com sucesso!' };
}

export default {
  createClient,
  getAllClients,
  getClientById,
  getClientByEmail,
  getClientByDocument,
  updateClient,
  deleteClient,
};
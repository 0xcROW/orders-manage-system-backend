import clientsRepository from '../repositories/clients.repository.js';

async function createClient(client, userId) {
  try {
    const createdClient = await clientsRepository.createClient(client, userId);
    if (!createdClient) {
      return { error: true, message: 'Erro ao criar cliente!' };
    }
    return { error: false, message: 'Cliente criado com sucesso!', client: createdClient };
  } catch (err) {
    console.error('Error in createClient:', err);
    return { error: true, message: 'Erro ao criar cliente!' };
  }
}

async function getAllClients() {
  return await clientsRepository.getAllClients();
}

async function getClientById(id) {
  if (!id) {
    return { error: true, message: 'Id não informado!' };
  }
  return await getClientByField('Id', id);
}

async function getClientByEmail(email) {
  return await getClientByField('Email', email);
}

async function getClientByDocument(document) {
  return await getClientByField('Document', document);
}

async function getClientByField(field, value) {
  const client = await clientsRepository[`getClientBy${field.charAt(0).toUpperCase() + field.slice(1)}`](value);
  if (!client) {
    return { error: true, message: `Cliente com ${field} ${value} não encontrado!` };
  }
  return client;
}

async function updateClient(client, id, userId) {
  const clientToUpdate = await clientsRepository.getClientById(id);


  if (!clientToUpdate) {
    return { error: true, message: 'Cliente não encontrado!' };
  }

  if (clientToUpdate.userId !== userId) {
    return { error: true, message: 'Usuário não autorizado!' };
  }

  const updatedClient = await clientsRepository.updateClient(id, client);
  return updatedClient;
}

async function deleteClient(id, userId) {
  const client = await clientsRepository.getClientById(id);
  if (!client) {
    return { error: true, message: 'Cliente não encontrado!' };
  }

  if (client.userId !== userId) {
    return { error: true, message: 'Usuário não autorizado!' };
  }

  await clientsRepository.deleteClient(id);
  return { error: false, message: 'Cliente removido com sucesso!' };
}

async function searchClients(searchCriteria) {
  try {
    // Call the repository method to search clients based on the provided criteria
    const clients = await clientsRepository.searchClients(searchCriteria);
    return clients;
  } catch (error) {
    throw new Error('Error while searching for clients');
  }
}

export default {
  createClient,
  getAllClients,
  getClientById,
  getClientByEmail,
  getClientByDocument,
  updateClient,
  deleteClient,
  searchClients,
};

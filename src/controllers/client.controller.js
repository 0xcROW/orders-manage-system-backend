import clientService from '../services/client.service.js';

// Utility function for error handling
function handleError(res, error) {
  res.status(400).send({ error: error.message });
}

async function createClient(req, res) {
  const userId = req.userId;
  const newClient = req.body;
  try {
    const client = await clientService.createClient(newClient, userId);
    res.status(201).send(client);
  } catch (error) {
    handleError(res, error);
  }
}

async function getAllClients(req, res) {
  try {
    const clients = await clientService.getAllClients();
    res.status(200).send(clients);
  } catch (error) {
    handleError(res, error);
  }
}

async function getClientById(req, res) {
  const { id } = req.params;
  try {
    const client = await clientService.getClientById(id);
    res.status(200).send(client);
  } catch (error) {
    handleError(res, error);
  }
}

async function getClientByEmail(req, res) {
  const { email } = req.params;
  try {
    const client = await clientService.getClientByEmail(email);
    res.status(200).send(client);
  } catch (error) {
    handleError(res, error);
  }
}

async function getClientByDocument(req, res) {
  const { document } = req.params;
  try {
    const client = await clientService.getClientByDocument(document);
    res.status(200).send(client);
  } catch (error) {
    handleError(res, error);
  }
}

async function updateClient(req, res) {
  const updatedClient = req.body;
  const { id: clientId } = req.params;
  const { userId } = req;

  console.log('ID DO CLIENTE: ', clientId);
  try {
    // Buscar cliente no banco
    const existingClient = await clientService.getClientById(clientId);

    console.log('Client fetched from DB controller:', existingClient);
    // Verificar se o cliente existe
    if (!existingClient) {
      return res.status(404).send({ message: 'Cliente não encontrado!' });
    }

    console.log('Client fetched from DB:', existingClient);

    console.log(updatedClient);

    // Verificar se o cliente possui um userId válido
    if (!existingClient.userId) {
      console.error('Erro: O cliente não possui userId associado.');
      return res.status(500).send({ message: 'Erro no registro do cliente.' });
    }

    // Verificar se o cliente pertence ao usuário autenticado
    if (existingClient.userId !== userId) {
      return res.status(403).send({ message: 'Usuário não autorizado!' });
    }

    // Atualizar cliente
    const response = await clientService.updateClient(updatedClient, clientId, userId);
    res.status(200).send(response);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).send({ message: 'Erro interno do servidor' });
  }
}

async function deleteClient(req, res) {
  const { userId, params: { id } } = req;
  try {
    await clientService.deleteClient(id, userId);
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
}

async function searchClients(req, res) {
  const { name, email, document } = req.query; // Retrieve query parameters

  try {
    // Construct query object dynamically based on the provided parameters
    const searchCriteria = {};
    if (name) searchCriteria.name = name;
    if (email) searchCriteria.email = email;
    if (document) searchCriteria.document = document;

    // Call service function to get filtered clients based on search criteria
    const clients = await clientService.searchClients(searchCriteria);
    res.status(200).send(clients);
  } catch (error) {
    res.status(400).send({ error: error.message });
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

import clientService from '../services/client.service.js';


async function createClient(req, res) {
  const newClient = req.body;
  try {
    const client = await clientService.createClient(newClient);
    res.status(201).send(client);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function getAllClients(req, res) {

  try{
    const clients = await clientService.getAllClients();
    res.status(200).send(clients);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function getClientById(req, res) {
  const id = req.params.id;
  try {
    const client = await clientService.getClientById(id);
    res.status(200).send(client);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function getClientByEmail(req, res) {
  const email = req.params.email;
  try {
    const client = await clientService.getClientByEmail(email);
    res.status(200).send(client);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function getClientByDocument(req, res) {
  const document = req.params.document;
  try {
    const client = await clientService.getClientByDocument(document);
    res.status(200).send(client);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function updateClient(req, res) {
  const id = req.params.id;
  const updatedClient = req.body;
  try {
    const client = await clientService.updateClient(id, updatedClient);
    res.status(200).send(client);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

async function deleteClient(req, res) {
  const id = req.params.id;
  try {
    await clientService.deleteClient(id);
    res.status(204).send();
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
  deleteClient
};
    
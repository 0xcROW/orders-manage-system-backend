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

export default { createClient };
    
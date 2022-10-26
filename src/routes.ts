import { Router } from 'express';
import { ClientController } from './modules/clients/controllers/client-controller';

const routes = Router();

const clientController = new ClientController();

routes.post('/clients', clientController.create);

export { routes };
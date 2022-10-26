import { Router } from 'express';
import { AuthenticateController } from './modules/authenticate/authenticate-controller';
import { ClientController } from './modules/clients/controllers/client-controller';

const routes = Router();

const clientController = new ClientController();
const authenticateController = new AuthenticateController();

routes.post('/authenticate', authenticateController.create);
routes.post('/clients', clientController.create);

export { routes };
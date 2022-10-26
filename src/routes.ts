import { Router } from 'express';
import { AuthenticateController } from './modules/authenticate/authenticate-controller';
import { ClientController } from './modules/clients/controllers/client-controller';
import { DeliverymanController } from './modules/deliveryman/controllers/deliveryman-controller';

const routes = Router();

const authenticateController = new AuthenticateController();
const clientController = new ClientController();
const deliverymanController = new DeliverymanController();

routes.post('/authenticate', authenticateController.create);
routes.post('/clients', clientController.create);
routes.post('/deliverymen', deliverymanController.create);

export { routes };
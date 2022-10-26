import { Router } from 'express';
import { AuthenticateClientController } from './modules/authenticate/authenticate-client-controller';
import { AuthenticateDeliverymanController } from './modules/authenticate/authenticate-deliveryman-controller';
import { DeliverymanController } from './modules/deliveryman/controllers/deliveryman-controller';
import { ClientController } from './modules/clients/controllers/client-controller';

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const clientController = new ClientController();
const deliverymanController = new DeliverymanController();

routes.post('/clients', clientController.create);
routes.post('/clients/authenticate', authenticateClientController.create);
routes.post('/deliverymen', deliverymanController.create);
routes.post('/deliverymen/authenticate', authenticateDeliverymanController.create);

export { routes };
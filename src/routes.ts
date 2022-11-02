import { Router } from 'express';
import { AuthenticateClientController } from './modules/authenticate/authenticate-client-controller';
import { AuthenticateDeliverymanController } from './modules/authenticate/authenticate-deliveryman-controller';
import { DeliverymanController } from './modules/deliveryman/controllers/deliveryman-controller';
import { ClientController } from './modules/clients/controllers/client-controller';
import { ensureClientAuthenticated } from './middlewares/ensureClientAuthenticated';
import { DeliveriesController } from './modules/deliveries/controllers/deliveries-controller';
import { ensureDeliverymanAuthenticated } from './middlewares/ensureDeliverymanAuthenticated';
import { ClientDeliveriesController } from './modules/clients/controllers/client-deliveries-controller';

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const clientController = new ClientController();
const clientDeliveriesController = new ClientDeliveriesController();
const deliverymanController = new DeliverymanController();
const deliveriesController = new DeliveriesController();

routes.get('/clients/deliveries', ensureClientAuthenticated, clientDeliveriesController.index);
routes.post('/clients', clientController.create);
routes.post('/clients/authenticate', authenticateClientController.create);

routes.post('/deliverymen', deliverymanController.create);
routes.post('/deliverymen/authenticate', authenticateDeliverymanController.create);

routes.get('/deliveries', ensureDeliverymanAuthenticated, deliveriesController.index);
routes.post('/deliveries', ensureClientAuthenticated, deliveriesController.create);
routes.put('/deliveries/:delivery_id', ensureDeliverymanAuthenticated, deliveriesController.update);

export { routes };
import { Router } from 'express';
import { AuthenticateClientController } from './modules/authenticate/authenticate-client-controller';
import { AuthenticateDeliverymanController } from './modules/authenticate/authenticate-deliveryman-controller';
import { DeliverymanController } from './modules/deliveryman/controllers/deliveryman-controller';
import { ClientController } from './modules/clients/controllers/client-controller';
import { ensureClientAuthenticated } from './middlewares/ensureClientAuthenticated';
import { DeliveriesController } from './modules/deliveries/controllers/deliveries-controller';
import { ensureDeliverymanAuthenticated } from './middlewares/ensureDeliverymanAuthenticated';
import { ClientDeliveriesController } from './modules/clients/controllers/client-deliveries-controller';
import { DeliverymanDeliveriesController } from './modules/deliveryman/controllers/deliveryman-deliveries-controller';
import { FinalizeDeliveryController } from './modules/deliveries/controllers/finalize-delivery-controller';

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const clientController = new ClientController();
const clientDeliveriesController = new ClientDeliveriesController();
const deliverymanController = new DeliverymanController();
const deliverymanDeliveriesController = new DeliverymanDeliveriesController();
const deliveriesController = new DeliveriesController();
const finalizeDeliveriesController = new FinalizeDeliveryController();

routes.get('/clients/deliveries', ensureClientAuthenticated, clientDeliveriesController.index);
routes.post('/clients', clientController.create);
routes.post('/clients/authenticate', authenticateClientController.create);
routes.get('/clients/me', ensureClientAuthenticated, clientController.index);

routes.get('/deliverymen/deliveries', ensureDeliverymanAuthenticated, deliverymanDeliveriesController.index);
routes.post('/deliverymen', deliverymanController.create);
routes.post('/deliverymen/authenticate', authenticateDeliverymanController.create);

routes.get('/deliveries', ensureDeliverymanAuthenticated, deliveriesController.index);
routes.post('/deliveries', ensureClientAuthenticated, deliveriesController.create);
routes.put('/deliveries/:delivery_id', ensureDeliverymanAuthenticated, deliveriesController.update);
routes.patch('/deliveries/:delivery_id', ensureDeliverymanAuthenticated, finalizeDeliveriesController.update);

export { routes };
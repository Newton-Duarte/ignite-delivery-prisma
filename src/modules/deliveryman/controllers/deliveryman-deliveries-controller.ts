import { Request, Response } from "express";
import { FindDeliverymanDeliveriesService } from "../services/find-deliveryman-deliveries-service";

export class DeliverymanDeliveriesController {
  async index(request: Request, response: Response) {
    const { page } = request.query;
    const { deliveryman_id } = request;

    const findDeliverymanDeliveriesService = new FindDeliverymanDeliveriesService();
    const deliverymanDeliveries = await findDeliverymanDeliveriesService.execute({ deliveryman_id, page: Number(page) || 1 });

    return response.json(deliverymanDeliveries);
  }
}
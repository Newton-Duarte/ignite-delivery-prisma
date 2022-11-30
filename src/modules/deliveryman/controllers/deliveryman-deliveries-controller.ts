import { Request, Response } from "express";
import { FindDeliverymanDeliveriesService } from "../services/find-deliveryman-deliveries-service";

export class DeliverymanDeliveriesController {
  async index(request: Request, response: Response) {
    const { page, per_page, search, sort_by, sort } = request.query;
    const { deliveryman_id } = request;

    const findDeliverymanDeliveriesService = new FindDeliverymanDeliveriesService();
    const deliverymanDeliveries = await findDeliverymanDeliveriesService
      .execute({
        deliveryman_id,
        page: Number(page) || 1,
        per_page: Number(per_page) || 5,
        sort: sort ? String(sort) : 'desc',
        sort_by: sort_by ? String(sort_by) : 'created_at',
        search: search ? String(search) : ''
      });

    return response.json(deliverymanDeliveries);
  }
}
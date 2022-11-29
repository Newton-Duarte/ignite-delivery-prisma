import { Request, Response } from "express";
import { FindClientDeliveriesService } from "../services/find-client-deliveries-service";

export class ClientDeliveriesController {
  async index(request: Request, response: Response) {
    const { page, per_page, search, sort_by, sort } = request.query;
    const { client_id } = request;

    const findClientDeliveriesService = new FindClientDeliveriesService();
    const clientDeliveries = await findClientDeliveriesService
      .execute({
        client_id,
        page: Number(page) || 1,
        per_page: Number(per_page) || 5,
        sort: sort ? String(sort) : 'desc',
        sort_by: sort_by ? String(sort_by) : 'created_at',
        search: search ? String(search) : ''
      });

    return response.json(clientDeliveries);
  }
}
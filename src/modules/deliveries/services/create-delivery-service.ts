import { prisma } from "../../../database/prisma";

interface ICreateDelivery {
  item_name: string;
  client_id: string;
}

export class CreateDeliveryService {
  async execute({ item_name, client_id }: ICreateDelivery) {
    const delivery = await prisma.deliveries.create({
      data: {
        item_name,
        client_id
      }
    });

    return delivery;
  }
}
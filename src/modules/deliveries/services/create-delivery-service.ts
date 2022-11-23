import { prisma } from "../../../database/prisma";

interface ICreateDelivery {
  item_name: string;
  client_id: string;
  address: string;
}

export class CreateDeliveryService {
  async execute({ item_name, client_id, address }: ICreateDelivery) {
    const delivery = await prisma.deliveries.create({
      data: {
        item_name,
        client_id,
        address
      },
      include: {
        client: true
      }
    });

    return delivery;
  }
}
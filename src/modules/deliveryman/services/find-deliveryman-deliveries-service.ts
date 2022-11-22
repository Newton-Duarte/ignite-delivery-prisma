import { prisma } from "../../../database/prisma";

export class FindDeliverymanDeliveriesService {
  async execute(deliveryman_id: string) {
    const deliveries = await prisma.deliveries.findMany({
      where: {
        deliveryman_id
      },
    });

    return deliveries;
  }
}
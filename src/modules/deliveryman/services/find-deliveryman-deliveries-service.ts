import { prisma } from "../../../database/prisma";

export class FindDeliverymanDeliveriesService {
  async execute(deliveryman_id: string) {
    const deliveries = await prisma.deliveryman.findMany({
      where: {
        id: deliveryman_id
      },
      select: {
        id: true,
        username: true,
        deliveries: true,
      }
    });

    return deliveries;
  }
}
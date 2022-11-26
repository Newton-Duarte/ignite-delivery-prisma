import { prisma } from "../../../database/prisma";

export class FindClientDeliveriesService {
  async execute(client_id: string) {
    const totalDeliveries = await prisma.deliveries.count({
      where: {
        client_id
      }
    })
    const deliveries = await prisma.deliveries.findMany({
      where: {
        client_id
      },
      include: {
        client: true,
        deliveryman: true
      }
    });

    return { data: deliveries, total: totalDeliveries };
  }
}
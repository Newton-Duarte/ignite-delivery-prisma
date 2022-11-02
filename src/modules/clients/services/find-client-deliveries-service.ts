import { prisma } from "../../../database/prisma";

export class FindClientDeliveriesService {
  async execute(client_id: string) {
    const deliveries = await prisma.clients.findMany({
      where: {
        id: client_id
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
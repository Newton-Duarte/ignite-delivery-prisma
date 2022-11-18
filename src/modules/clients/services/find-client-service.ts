import { prisma } from "../../../database/prisma";

export class FindClientService {
  async execute(client_id: string) {
    const client = await prisma.clients.findFirst({
      where: {
        id: client_id
      },
      select: {
        id: true,
        username: true,
        address: true,
        name: true,
        deliveries: true,
      }
    });

    return client;
  }
}
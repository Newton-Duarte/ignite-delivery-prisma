import { prisma } from "../../../database/prisma";

interface IRequest {
  client_id: string
  page: number
  per_page?: number
  sort_by: string
  sort: string
  search?: string
}

export class FindClientDeliveriesService {
  async execute({ client_id, page, per_page = 5, sort, sort_by, search }: IRequest) {
    const totalDeliveries = await prisma.deliveries.count({
      where: {
        client_id,
        OR: [
          {
            deliveryman: {
              name: {
                contains: search,
                mode: 'insensitive'
              }
            },
          },
          {
            item_name: {
              contains: search,
              mode: 'insensitive'
            },
          }
        ]
      }
    })
    const deliveries = await prisma.deliveries.findMany({
      where: {
        client_id,
        OR: [
          {
            deliveryman: {
              name: {
                contains: search,
                mode: 'insensitive'
              }
            },
          },
          {
            item_name: {
              contains: search,
              mode: 'insensitive'
            },
          }
        ]
      },
      include: {
        client: true,
        deliveryman: true
      },
      skip: (page - 1) * per_page,
      take: per_page,
      orderBy: {
        [sort_by]: sort
      }
    });

    return { data: deliveries, total: totalDeliveries };
  }
}
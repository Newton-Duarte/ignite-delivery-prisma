import { hash } from "bcrypt";
import { prisma } from "../../../database/prisma";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanService {
  async execute({ username, password }: ICreateDeliveryman) {
    const deliverymanAlreadyExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    });

    if (deliverymanAlreadyExists) {
      throw new Error('Deliveryman already exists!');
    }

    const hashPassword = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      }
    });

    return deliveryman;
  }
}
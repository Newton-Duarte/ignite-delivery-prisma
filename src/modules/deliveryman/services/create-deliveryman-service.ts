import { hash } from "bcrypt";
import { prisma } from "../../../database/prisma";

interface ICreateDeliveryman {
  name: string;
  username: string;
  password: string;
}

export class CreateDeliverymanService {
  async execute({ name, username, password }: ICreateDeliveryman) {
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
        name,
        username,
        password: hashPassword,
      }
    });

    return deliveryman;
  }
}
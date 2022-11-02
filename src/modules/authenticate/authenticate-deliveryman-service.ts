import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { jwt } from "../../config/jwt";
import { prisma } from "../../database/prisma";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanService {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    });

    if (!deliveryman) {
      throw new Error('Invalid credentials!');
    }

    const passwordMatches = await compare(password, deliveryman.password);

    if (!passwordMatches) {
      throw new Error('Invalid credentials!');
    }

    const token = await sign({ username }, String(jwt.secret_deliveryman), {
      subject: deliveryman.id,
      expiresIn: '1d'
    });

    return token;
  }
}
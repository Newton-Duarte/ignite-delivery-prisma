import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { jwt } from "../../config/jwt";
import { prisma } from "../../database/prisma";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientService {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if (!client) {
      throw new Error('Invalid credentials!');
    }

    const passwordMatches = await compare(password, client.password);

    if (!passwordMatches) {
      throw new Error('Invalid credentials!');
    }

    const token = await sign({ username }, String(jwt.secret_client), {
      subject: client.id,
      expiresIn: '1d'
    });

    return { user: { id: client.id, name: client.name, username: client.username, address: client.address }, token };
  }
}
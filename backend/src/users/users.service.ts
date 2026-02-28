import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            include: { profile: true }
        });
    }

    async createUser(email: string, passwordHash: string) {
        return this.prisma.user.create({
            data: {
                email,
                passwordHash,
                profile: {
                    create: {}
                }
            }
        });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            include: { profile: true }
        });
    }
}

import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(email: string, pass: string) {
        const existing = await this.usersService.findByEmail(email);
        if (existing) {
            throw new BadRequestException('Email already in use');
        }
        const hash = await bcrypt.hash(pass, 10);
        const user = await this.usersService.createUser(email, hash);
        return this.generateTokens(user);
    }

    async login(email: string, pass: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(pass, user.passwordHash);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.generateTokens(user);
    }

    async refreshTokens(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'your_jwt_refresh_secret_key_change_me'
            });
            const user = await this.usersService.findById(payload.sub);
            if (!user) throw new UnauthorizedException('Invalid refresh token');
            return this.generateTokens(user);
        } catch (e) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    private generateTokens(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET') || 'your_jwt_access_secret_key_change_me',
                expiresIn: '15m'
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'your_jwt_refresh_secret_key_change_me',
                expiresIn: '7d'
            })
        };
    }
}

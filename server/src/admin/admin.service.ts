import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import  jwt from 'jsonwebtoken';

@Injectable()
export class AdminService {
    private readonly EnvAdminEmail: string;
    private readonly EnvAdminPassword: string;
    private readonly JWT_SECRET: string;

    constructor(private configService: ConfigService) {
        this.EnvAdminEmail = this.configService.get<string>('ADMIN_EMAIL') || '';
        this.EnvAdminPassword = this.configService.get<string>('ADMIN_PASSWORD') || '';
        this.JWT_SECRET = this.configService.get<string>('JWT_SECRET') || 'default_secret';
    }

    async adminLogin(email: string, password: string): Promise<{ token?: string; message?: string; success: boolean }> {

        if (email !== this.EnvAdminEmail || password !== this.EnvAdminPassword) {
            return { success: false, message: "Invalid Credentials" };
        }

        const token = jwt.sign({ email }, this.JWT_SECRET);

        return { success: true, token };

    }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('/api/admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('/login')
    adminLogin(@Body() body: { email: string; password: string }) {
        const { email, password } = body;
        return this.adminService.adminLogin(email, password);
    }
}

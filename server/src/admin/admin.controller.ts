import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('/api/admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('/login')
    adminLogin(@Body() body: { email: string; password: string }) {
        const { email, password } = body;
        return this.adminService.adminLogin(email, password);
    }
    @Get("/comments")
    getAllComments() {
        return this.adminService.getAllComment()
    }
}

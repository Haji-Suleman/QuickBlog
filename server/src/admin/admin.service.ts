import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken'; // ✅ fix for ESM
import { Document, Model } from 'mongoose';
import { BlogDocument } from 'src/Blog/blog.schema';
import { CommentDocument } from 'src/comment/comment.schema';
@Injectable()
export class AdminService {
  private readonly EnvAdminEmail: string;
  private readonly EnvAdminPassword: string;
  private readonly JWT_SECRET: string;


  constructor(private configService: ConfigService, @InjectModel('blog') private blogModel: Model<BlogDocument>,
    @InjectModel('comment') private commentModel: Model<CommentDocument>) {
    this.EnvAdminEmail = this.configService.get<string>('ADMIN_EMAIL') || '';
    this.EnvAdminPassword = this.configService.get<string>('ADMIN_PASSWORD') || '';
    this.JWT_SECRET = this.configService.get<string>('JWT_SECRET') || "";
  }

  async adminLogin(email: string, password: string): Promise<{ token?: string; message?: string; success: boolean }> {
    if (email !== this.EnvAdminEmail || password !== this.EnvAdminPassword) {
      return { success: false, message: 'Invalid Credentials' };
    }
    const token = jwt.sign({ email }, this.JWT_SECRET);
    return { success: true, token };
  }
  async getAllBlogsAdmin() {
    try {
      const blogs = await this.blogModel.find({}).sort({ createdAt: -1 });
      return { success: true, blogs } // ✅ add return

    } catch (error) {
      return { succes: false, error: error.message }
    }
  }
  async getAllComment() {
    try {
      const comments = await this.commentModel.find({}).populate("blog").sort({ createdAt: -1 })
      return { success: true, comments }
    } catch (error) {
      return { success: false, message: error.message }

    }
  }
  async getDashboard() {
    try {
      const recentBlogs = await this.blogModel.find({}).sort({ createdAt: -1 }).limit(5)
      const blogs = await this.blogModel.countDocuments();
      const comments = await this.commentModel.countDocuments()
      const drafts = await this.blogModel.countDocuments({ isPublished: true })
      const dashboardData = {
        blogs, comments, drafts, recentBlogs
      }
      return { success: true, dashboardData }
    }
    catch (error) {
      return { success: false, message: error.message }
    }
  }
  async deleteCommentById(body: { id: string }) {
    try {
      const { id } = body
      await this.commentModel.findByIdAndDelete(id)
      return { success: true, message: "Comment deleted successfully" }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
  async approveCommentById(body: { id: string }) {
    try {
      const { id } = body;
      await this.commentModel.findByIdAndUpdate(id, { isApproved: true });
      return { success: true, message: "Comment Approved successfully" }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

}

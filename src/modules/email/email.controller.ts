import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './email.service';
import { skipAuth } from '../../helpers/skipAuth';
import { SendEmailDto, createTemplateDto, getTemplateDto } from './dto/email.dto';
import { skip } from 'node:test';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('send-confirmation-otp')
  async sendEmailConfirmationOtp(@Body() body: SendEmailDto, @Res() response: Response): Promise<any> {
    await this.emailService.sendEmail(body);
    return response.status(200).json({ message: 'Email confirmation OTP sent successfully' });
  }

  @Post('store-template')
  async storeTemplate(@Body() body: createTemplateDto, @Res() res: Response): Promise<any> {
    const response = await this.emailService.createTemplate(body);
    res.status(response.status_code).send(response);
  }

  @Post('get-template')
  async getTemplate(@Body() body: getTemplateDto, @Res() res: Response): Promise<any> {
    const response = await this.emailService.getTemplate(body);
    res.status(response.status_code).send(response);
  }

  @Post('delete-template')
  async deleteTemplate(@Body() body: getTemplateDto, @Res() res: Response): Promise<any> {
    const response = await this.emailService.getTemplate(body);
    res.status(response.status_code).send(response);
  }
}

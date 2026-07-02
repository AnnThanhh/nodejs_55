import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { transporter } from 'src/common/nodemailer/init.nodemailer';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  async create(createEmailDto: CreateEmailDto) {
    try {
      const email = createEmailDto.Users.email;
      const fullName = createEmailDto.Users.fullName;
      const foodName = createEmailDto.Foods.name;
      const info = await transporter.sendMail({
        from: 'trinhanthanh@gmail.com',
        to: email,
        subject: 'Order Confirmation 🍰',
        text: `Hello ${fullName}, your order for ${foodName} has been received.`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Order Confirmation</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.08);">

          <!-- Header -->
          <tr>
            <td
              style="background:#e74c3c;color:white;padding:30px;text-align:center;">
              <h1 style="margin:0;">🍰 Order Confirmation</h1>
              <p style="margin-top:10px;font-size:16px;">
                Thank you for your purchase!
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <h2 style="color:#333;">
                Hello ${fullName},
              </h2>

              <p style="font-size:16px;color:#555;line-height:1.8;">
                Thank you for placing your order.
                We have successfully received your request and are preparing your delicious dessert.
              </p>

              <table width="100%" cellpadding="12"
                style="margin:30px 0;border:1px solid #eeeeee;border-radius:6px;background:#fafafa;">
                <tr>
                  <td width="40%" style="font-weight:bold;color:#666;">
                    Product
                  </td>
                  <td style="color:#333;">
                    ${foodName}
                  </td>
                </tr>

                <tr>
                  <td style="font-weight:bold;color:#666;">
                    Customer
                  </td>
                  <td>
                    ${fullName}
                  </td>
                </tr>

                <tr>
                  <td style="font-weight:bold;color:#666;">
                    Status
                  </td>
                  <td style="color:#27ae60;font-weight:bold;">
                    ✅ Order Received
                  </td>
                </tr>
              </table>

              <div style="text-align:center;margin:40px 0;">
                <a href="#"
                  style="background:#e74c3c;color:white;padding:14px 28px;
                  text-decoration:none;border-radius:5px;font-weight:bold;">
                  View Order
                </a>
              </div>

              <p style="font-size:15px;color:#555;line-height:1.8;">
                We will notify you once your order has been processed.
              </p>

              <p style="font-size:15px;color:#555;">
                Thank you for choosing us ❤️
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="background:#f8f8f8;padding:25px;text-align:center;font-size:13px;color:#999;">
              <p style="margin:0;">
                © 2026 Your Company. All rights reserved.
              </p>
              <p style="margin-top:8px;">
                This is an automated email. Please do not reply.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`,
      });

      console.log('Message sent:', info.messageId);
    } catch (err) {
      console.error(err);
    }
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}

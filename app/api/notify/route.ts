import nodemailer from 'nodemailer';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { type, payload } = await req.json();
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_USER || !SMTP_PASS) {
      console.error("Missing SMTP credentials in environment variables.");
      return Response.json({ error: 'Internal Server Error: SMTP credentials missing.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST || 'smtp.gmail.com',
      port: Number(SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const brokerSubject = type === 'form'
      ? `New Website Inquiry: ${payload.name || 'General'}`
      : `AI Deal Analysis Log - AssetLift`;

    const brokerHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Inquiry Received</h2>
        <p><strong>Name:</strong> ${payload.name || 'Not Provided'}</p>
        <p><strong>Email:</strong> ${payload.email || 'Not Provided'}</p>
        <p><strong>Phone:</strong> ${payload.phone || 'Not Provided'}</p>
        <p><strong>Program:</strong> ${payload.program || 'General Inquiry'}</p>
        <p><strong>Purchase Price / Refi:</strong> $${payload.loanAmount || 'N/A'}</p>
        <p><strong>Projected ARV:</strong> $${payload.arv || 'N/A'}</p>
        <p><strong>Rehab Amount:</strong> $${payload.rehabAmount || 'N/A'}</p>
        <p><strong>Property:</strong> ${payload.propertyAddress || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${payload.message || 'No message provided.'}</p>
        ${payload.analysis_result ? `
          <div style="margin-top: 20px; padding: 15px; background: #f4f7fa; border-left: 4px solid #2563eb;">
            <strong>AI Chatbot Analysis:</strong>
            <pre style="white-space: pre-wrap; font-family: inherit;">${payload.analysis_result}</pre>
          </div>
        ` : ''}
      </div>
    `;

    await transporter.sendMail({
      from: `"AssetLift Lending" <${SMTP_USER}>`,
      to: "info@assetliftlending.com",
      replyTo: payload.email || SMTP_USER,
      subject: brokerSubject,
      html: brokerHtml,
    });

    if (type === 'form' && payload.email) {
      const userHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e5e7eb; border-top: 8px solid #2563eb;">
          <h1 style="color: #000; font-style: italic; font-weight: 900; text-transform: uppercase; margin-bottom: 20px;">AssetLift Lending</h1>
          <p style="font-size: 18px; font-weight: bold; color: #2563eb;">Application Received Successfully.</p>
          <p>Hi ${payload.name},</p>
          <p>Thank you for reaching out to AssetLift Lending. We have received your inquiry regarding <strong>${payload.program || 'financing'}</strong> and are currently reviewing your deal specifics.</p>

          <div style="background: #f9fafb; padding: 25px; border-radius: 4px; margin: 25px 0;">
            <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">What happens next?</p>
            <p style="margin: 10px 0 0 0; font-weight: bold; font-size: 16px;">One of our loan specialists will contact you within 60 minutes with a soft-quote or a request for additional items.</p>
          </div>

          <p>If you have immediate questions, feel free to reply to this email or call us at +1 929-639-2284.</p>

          <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />

          <p style="font-size: 11px; color: #9ca3af; line-height: 1.5;">
            <strong>AssetLift Lending</strong><br/>
            300 East McBee Ave., STE 200, Greenville, SC 29601<br/>
            Direct Private Money Lender | NMLS #1324403
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `"AssetLift Lending" <${SMTP_USER}>`,
        to: payload.email,
        subject: "Confirmation: Your funding inquiry has been received",
        html: userHtml,
      });
    }

    return Response.json({ success: true });
  } catch (error: any) {
    console.error("Notification Error:", error);
    return Response.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

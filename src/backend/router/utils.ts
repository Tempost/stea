import * as trpc from '@trpc/server';
import type { Context } from '@/backend/prisma';
import { Prisma } from '@prisma/client';
import { createTransport, SendMailOptions } from 'nodemailer';

export const createRouter = () => {
  return trpc.router<Context>();
};

export function prepareCombos(
  combos: Prisma.RiderComboCreateManyInput[] | undefined
) {
  if (!combos) {
    return [];
  }

  return combos.map(combo => {
    return { horseName: combo.horseName, division: combo.division };
  });
}

export function sendMail(name: string, email: string) {
  const sender = createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
    secure: true,
  });

  const mailData: SendMailOptions = {
    from: '<stea@steventing.net>',
    to: email,
    subject: `Welcome ${name} to South Text Eventing Association`,
    text: plainTextEmail, // Plain Text of the message body
    html: emailTemplate, // Formated body
  };

  sender.sendMail(mailData, (err, info) => {
    if (err) console.error(err);
    else console.info(info);
  });
}

const plainTextEmail =
  'We would like to welcome you to the new local eventing association STEA. We are replacing GHCTA. This email is to acknowledge that we have received your membership. Your first member benefit is a great discount, 15% off at Riding Warehouse. The discount code is STEA15. Horse Tack | Horse Gear & Supplies - Riding Warehouse Watch for many more benefits coming soon! The calendar of events for the year is posted to our website: steventing.net Again Welcome to STEA Laura Sartwelle Marike Owen Lynette Diamond President Vice President Treasurer ';

const emailTemplate = `
<div dir="ltr">
  <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif" dir="ltr">We would like to welcome you to the new local eventing association STEA. We are replacing GHCTA. This email is to acknowledge that we have received your membership.&nbsp;</div>
  <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif" dir="ltr"><br clear="none"></div>
  <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif" dir="ltr">Your first member benefit is a great discount, 15% off at Riding Warehouse. <b>The discount code is STEA15.</b></div>
  <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif" dir="ltr"><br></div>
  <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif" id="m_-7375772072300242269m_4143579426738006213ydp11ba62eyiv2623279162yqtfd78565">
    <div dir="ltr">&nbsp;<a rel="nofollow" style="color:rgb(25,106,212);text-decoration-line:underline" href="https://www.ridingwarehouse.com/" shape="rect" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.ridingwarehouse.com/&amp;source=gmail&amp;ust=1669342187829000&amp;usg=AOvVaw2-bSqHPtzDgHe0HRddrKSB">Horse Tack | Horse Gear &amp; Supplies - Riding Warehouse</a>&nbsp;</div>
  </div>

  <br clear="all">
  <div>
    <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif" dir="ltr">Watch for many more benefits coming soon!</div>
    <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif" dir="ltr"><br></div>
    <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif">The calendar of events for the year is posted to our website: <a href="http://steventing.net" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://steventing.net&amp;source=gmail&amp;ust=1669342187829000&amp;usg=AOvVaw32mi_5eu2Na_TPlnNV0ziJ">steventing.net</a> <br></div>
    <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif"></div>
    <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif" dir="ltr"><br clear="none"></div>
    <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif" dir="ltr"><b>Again Welcome to STEA</b></div>
    <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif" dir="ltr"><br clear="none"></div>
    <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif" dir="ltr">Laura Sartwelle&nbsp; &nbsp; &nbsp; &nbsp;Marike Owen&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Lynette Diamond</div>
    <div style="color:rgb(38,40,42);font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif" dir="ltr">President&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Vice President&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Treasurer&nbsp; &nbsp; &nbsp;</div>
  </div>
  <div class="yj6qo"></div>
  <div class="adL"></div>
  <div class="adL"><br></div>
  <div class="adL">&nbsp;<br></div>
  <div data-smartmail="gmail_signature" dir="ltr" class="adL">
    <div dir="ltr">
      <div><br></div>
    </div>
  </div>
</div>
`;

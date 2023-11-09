import { MailService, ResponseError } from '@sendgrid/mail';
import { procedure, router } from '../trpc';
import z from 'zod';

export const mail = router({
  send: procedure.input(z.any()).mutation(async ({ input }) => {
    const mailer = createMailer();

    try {
      const res = await mailer.send(input);

      return res;
    } catch (error) {
      return error as ResponseError;
    }
  }),

  welcome: procedure.input(z.any()).mutation(async ({ input: { member } }) => {
    const mailer = createMailer();

    try {
      const res = await mailer.send({
        to: member.email,
        from: 'stea@steventing.net',
        subject: 'Welcome to stea',
        text: 'Welcome to south texas eventing association',
        html: '<div>Welcome to South Texas Eventing Association</div>',
      });

      return res;
    } catch (error) {
      return error as ResponseError;
    }
  }),
});

function createMailer() {
  const mailer = new MailService();
  mailer.setApiKey(process.env.SENDGRID_API_KEY);
  return mailer;
}

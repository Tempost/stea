import { createInnerContext } from '../../server/context';
import { appRouter } from '../../server/router/_app';

describe('tRPC mail router tests', () => {
  it('send mail', async () => {
    const ctx = await createInnerContext({ token: null });
    const caller = appRouter.createCaller(ctx);
    const res = await caller.mail.send({
      to: 'codyldiamond@gmail.com',
      from: 'stea@steventing.net',
      subject: 'buttholes',
      text: 'brown starfish',
      html: '<strong>Brown Starfish</strong>',
    });

    console.log(res);
  });
});

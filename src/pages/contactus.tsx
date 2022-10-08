import { PropsWithChildren, ReactElement } from 'react';
import { PublicLayout } from '@/components/layout';

function ContactCard({ children }: PropsWithChildren) {
  return <p className='rounded-md shadow-2xl w-fit p-5'>{children}</p>;
}
function ContactUs() {
  return (
    <section className='flex flex-col justify-center items-center h-full'>
      <h1 className='text-lg md:text-2xl font-bold text-neutral mx-auto w-fit'>
        Boardmember Contact Information
      </h1>
      <div className='container mx-auto flex flex-row flex-wrap justify-center gap-10 m-10'>
        <ContactCard>
          New Horizon Stables
          <br />
          Lynette Diamond
          <br />
          25498 Macedonia Road
          <br />
          Hockley, TX 77447
          <br />
          (832) 766-8400
          <br />
          newhorizonstables@sbcglobal.net
          <br />
        </ContactCard>
        <ContactCard>
          Pine Hill
          <br />
          Ruth Swain
          <br />
          1720 Hwy. 159 East
          <br />
          Bellville, TX 77418
          <br />
          (979) 865-5591
          <br />
          pinehilltexas@sbcglobal.net
          <br />
        </ContactCard>
        <ContactCard>
          Meadow Creek Park
          <br />
          Kaitlyn Arnold
          <br />
          1342 State Hwy 14
          <br />
          Kosse, TX 76653
          <br />
          (512) 227-0678
          <br />
          meadowcreekparktexas@gmail.com
          <br />
        </ContactCard>
        <ContactCard>
          Snowdonia Sporthorse Complex
          <br />
          Jayne Lloyd
          <br />
          6714 Neiman Road
          <br />
          Brookshire, TX 77423
          <br />
          (281) 460-9107
          <br />
          snowdoniasporthc@yahoo.com
          <br />
        </ContactCard>
      </div>
    </section>
  );
}
ContactUs.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default ContactUs;

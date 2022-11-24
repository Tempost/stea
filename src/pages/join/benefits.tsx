import { PublicLayout } from '@/components/layout';
function SteaBeneifits() {
  return (
    <div className='hero min-h-screen bg-opacity-50 bg-[url(/train_jump_1440.webp)]'>
      <div className='hero-overlay bg-opacity-50'></div>
      
      <div className=' rounded-2xl hero-content text-center text-neutral-content h-24 w-2/6 flex-col'>
        <h1 className=' text-Black-100 text-center text-7xl'>Rewards:</h1>
        <h1 className=' text-Black-100 text-center text-9xl'>   </h1>
        <h1 className='text-amber-400 text-center text-5xl'>
          Gold Level: $200
        </h1>
        <h1 className=' text-slate-300  text-center text-5xl'>
          Silver Level $100
        </h1>
        <h1 className='text-amber-700 text-center text-5xl'>
          Bronze Level: $40
        </h1>

        <h1 className='text-black-200 text-center text-5xl'>
          General Guidelines
        </h1>
        <h1 className='text-black-200 text-center text-2xl'>1:</h1>
        <h1 className='text-black-200 text-center text-2xl'>2:</h1>
        <h1 className='text-black-200 text-center text-2xl'>3:</h1>
        <h1 className='text-black-200 text-center text-2xl'>4:</h1>
        <h1 className='text-black-200 text-center text-2xl'>5:</h1>
        <h1 className='text-black-200 text-center text-2xl'>6:</h1>
        <h1 className='text-black-200 text-center text-2xl'>7:</h1>
      </div>
      
      <div className=' rounded-3xl  h-80 w-5/6 flex-col'>
        
      </div>

      
      
      
    </div>
    
  )
    
  

}
import { ReactElement } from 'react';
SteaBeneifits.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaBeneifits;

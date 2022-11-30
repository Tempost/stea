import { PublicLayout } from '@/components/layout';
function SteaBeneifits() {
  return (
    <div className='text-center'>
      <div className='hero min-h-screen bg-[url(/train_jump_1440.webp)] bg-fixed'>
        <div className='hero-overlay bg-opacity-60'></div>
      
        <div className=' rounded-2xl hero-content text-center text-neutral-content h-24 w-3/6 flex-col'>
          <h1 className=' text-Black-100 text-center text-7xl'>Rewards:</h1>
          <h1 className=' text-Black-100 text-center text-9xl'> </h1>
          <h1 className='text-amber-400 text-center text-5xl font-bold font-mono'>
            Gold Level: $200 (50 hours)
          </h1>
          <h1 className=' text-slate-300  text-center text-5xl font-bold font-mono'>
            Silver Level:$100 (25 hours)
          </h1>
          <h1 className='text-amber-700 text-center text-5xl font-bold font-mono'>
            Bronze Level:$40 (10 hours)
          </h1>
          <h1 className=' text-Black-100 text-center text-9xl'>   </h1>
          <h1 className=' text-Black-100 text-center text-9xl'>   </h1>
          <h1 className=' text-Black-100 text-center text-9xl'>   </h1>
          <h1 className='text-red-500 text-center text-5xl font-bold'>
            IMPORTANT
          </h1>
          <h1 className='text-black-200 text-center text-2xl'>
            1: Must be a current Stea member to cache in hours
          </h1>
          <h1 className='text-black-200 text-center text-2xl'>
            2: May only earn 5 hours per day, per event
          </h1>
          <h1 className='text-black-200 text-center text-2xl'>
            3: may only cache hours once per year, per member
          </h1>
          <h1 className='text-black-200 text-center text-2xl'>
            4: PHYSICAL volunteer form must be signed by the show Secretary
          </h1>
          <h1 className='text-black-200 text-center text-2xl'>
            5: submit your form online for approval
          </h1>
        </div>
        <div className=' rounded-3xl  h-80 w-5/6 flex-col'></div>
      </div>
      <h1 className='text-black-200 text-center text-2xl font-bold'>
        Submit your volunteer form Here
      </h1>
      <form
        action='uploadPlaceholder'
        encType='multipart/form-data'
      >
        <input
          type='file'
          accept='image/*'
          name='uploadVolunteerForm'
          className=''
        ></input>
        <input
          type='submit'
          value='upload'
        ></input>
      </form>
    </div>
  )
    
  

}
import { ReactElement } from 'react';
SteaBeneifits.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaBeneifits;

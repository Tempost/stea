import { PublicLayout } from '@/components/layout';
function SteaBeneifits() {
  return (
    <div className='text-center'>
      <div className='hero min-h-screen bg-[url(/membersandhorses.jpg)] bg-fixed '>
        <div className='hero-overlay bg-opacity-50'></div>
      
        <div className=' rounded-2xl hero-content text-center text-neutral-content flex-col  w-auto bg-slate-500 bg-opacity-50 h-auto'>
          <h1 className=' text-Black-100 text-center lg:text-7xl sm:text-5xl'>Rewards:</h1>
          <h1 className=' text-Black-100 text-center text-9xl'> </h1>
          <h1 className='text-amber-500 text-center lg:text-5xl font-bold font-mono sm:text-3xl md:text-4xl'>
            Gold Level: $200 (50 hours)
          </h1>
          <h1 className=' text-slate-400  text-center lg:text-5xl font-bold font-mono sm:text-3xl md:text-4xl'>
            Silver Level:$100 (25 hours)
          </h1>
          <h1 className='text-amber-800 text-center lg:text-5xl font-bold font-mono sm:text-3xl md:text-4xl'>
            Bronze Level:$40 (10 hours)
          </h1>
          <h1 className=' text-Black-100 text-center lg:text-9xl '>   </h1>
          
          <h1 className='text-red-500 text-center md:text-5xl font-bold sm:text-3xl'>
            IMPORTANT
          </h1>
          <h1 className='text-black-200 text-center lg:text-2xl md:text-xl sm:text-lg'>
            1: Must be a current Stea member to cache in hours
          </h1>
          <h1 className='text-black-200 text-center lg:text-2xl md:text-xl sm:text-lg'>
            2: May only earn 5 hours per day, per event
          </h1>
          <h1 className='text-black-200 text-center lg:text-2xl md:text-xl sm:text-lg'>
            3: may only cache hours once per year, per member
          </h1>
          <h1 className='text-black-200 text-center lg:text-2xl md:text-xl sm:text-lg'>
            4: PHYSICAL 'volunteer form' must be signed by the show Secretary
          </h1>
          <h1 className='text-black-200 text-center lg:text-2xl md:text-xl sm:text-lg'>
            5: submit your form online for approval 'Here'
          </h1>
        </div>
        <div className=' rounded-3xl  h-80 w-5/6 flex-col'></div>
      </div>
      <h1 className='text-black-200 text-center text-2xl font-bold'>
        Submit your volunteer form Here
      </h1>
      <form
        action='placeholder'
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

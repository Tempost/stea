function SteaBeneifits() {
  return (
    <div className='text-center'>
      <div className='hero min-h-screen bg-[url(/membersandhorses.jpg)] bg-fixed'>
        <div className='hero-overlay bg-opacity-50'></div>

        <div className='hero-content h-auto w-auto flex-col rounded-2xl bg-blue-500 bg-opacity-30 text-center text-neutral-content'>
          <h1 className='text-black-100 text-center sm:text-5xl lg:text-7xl'>
            Rewards:
          </h1>
          <h1 className='text-black-100 text-center text-9xl'> </h1>
          <h1 className='text-center font-mono font-bold text-amber-500 sm:text-3xl md:text-4xl lg:text-5xl'>
            Gold Level: $200 (50 hours)
          </h1>
          <h1 className='text-center font-mono font-bold text-slate-400 sm:text-3xl md:text-4xl lg:text-5xl'>
            Silver Level:$100 (25 hours)
          </h1>
          <h1 className='text-center font-mono font-bold text-amber-800 sm:text-3xl md:text-4xl lg:text-5xl'>
            Bronze Level:$40 (10 hours)
          </h1>
          <h1 className='text-black-100 text-center lg:text-9xl'> </h1>

          <h1 className='text-center font-bold text-red-500 sm:text-3xl md:text-5xl'>
            IMPORTANT
          </h1>
          <h1 className='text-black-200 text-center sm:text-lg md:text-xl lg:text-2xl'>
            <a
              href='#'
              className='font-bold'
            >
              1:
            </a>{' '}
            Must be a current Stea member to cache in hours
          </h1>
          <h1 className='text-black-200 text-center sm:text-lg md:text-xl lg:text-2xl'>
            <a
              href='#'
              className='font-bold'
            >
              2:
            </a>{' '}
            May only earn 5 hours per day, per event
          </h1>
          <h1 className='text-black-200 text-center sm:text-lg md:text-xl lg:text-2xl'>
            <a
              href='#'
              className='font-bold'
            >
              3:
            </a>{' '}
            may only cache hours once per year, per member
          </h1>
          <h1 className='text-black-200 text-center sm:text-lg md:text-xl lg:text-2xl'>
            <a
              href='#'
              className='font-bold'
            >
              4:
            </a>{' '}
            PHYSICAL 'volunteer form' must be signed by the show Secretary
          </h1>
          <h1 className='text-black-200 text-center sm:text-lg md:text-xl lg:text-2xl'>
            <a
              href='#'
              className='font-bold'
            >
              5:
            </a>{' '}
            send a picture of the form and name of volunteer to{' '}
            <a className='font-medium text-lime-400 dark:text-lime-300'>
              {' '}
              stea@steventing.net
            </a>{' '}
            or submit this{' '}
            <a
              href='https://forms.gle/gTLJahxGC5oyyCe27'
              className='font-medium text-lime-300 underline dark:text-lime-200'
            >
              {' '}
              form
            </a>
          </h1>
        </div>
        <div className='h-80 w-5/6 flex-col rounded-3xl'></div>
      </div>
    </div>
  );
}

export default SteaBeneifits;

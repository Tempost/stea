function Index() {
  // <img
  //   className='absolute right-0 top-0'
  //   src='/STEA_photos/A99I3830-(ZF-5269-01547-1-001).jpg'
  //   />
  return (
    <>
      <section>
        <div className='hero min-h-screen bg-home-hero bg-fixed'>
          <div className="hero-overlay bg-opacity-40"></div>

          <div className='hero-content text-neutral-content text-center fixed'>
            <div className='flex flex-col items-center gap-5 relative min-w-full'>
              <h2 className='text-8xl'> STEA </h2>
              <p className='text-sm'> South Texas Eventing Association </p>

              <h2 className='text-3xl'> Texas's Southwest Premier Eventing Association </h2>
              <button className='btn btn-primary'> Join Today! </button>
            </div>

          </div>
        </div>
      </section>

      <section className='flex flex-col items-center'>
        <h1 className='text-xl'> End of Year Placings</h1>
        <table className='table table-compact w-fit'>
          <thead>
            <tr>
              <th></th>
              <th>Rider Division</th>
              <th>Member</th>
              <th>Horse</th>
              <th>Total Points</th>
              <th>Show Count</th>
              <th>Placing</th>
            </tr>
          </thead>
        </table>
      </section>

      <section className='flex flex-col items-center'>
        <h1 className='text-xl'>Recognized vendors</h1>
        <div>
        </div>
      </section>
    </>
  )
}

export default Index

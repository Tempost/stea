function EOYPlacing() {
  return process.env.NODE_ENV === 'production' ? (
    <>
      <h1 className='text-xl'>End of Year Placings</h1>
    </>
  ): null;
}

export default EOYPlacing;

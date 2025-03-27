import FormSelector from './FormSelector';

function JoinPage() {
  return (
    <section>
      <h2 className='border-b-2 border-gray-200 text-center text-2xl'>
        Join Online Below
      </h2>
      <div className='card-body grid place-items-center'>
        <h3>Membership Application type:</h3>
        <FormSelector />
      </div>
    </section>
  );
}

export default JoinPage;

import { GlobalState, useStateMachine } from 'little-state-machine';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function SteaJoin() {
  const { state, actions } = useStateMachine();
  
  const { register, handleSubmit } = useForm<GlobalState>({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    resolver: zodResolver(schema)
  });

  return (
    <div className='grid place-content-center h-full bg-opacity-50'>
      <div className='card w-fit bg-base-100 shadow-[0_0_10px_0_rgba(0,0,0,0.3)]'>

        <section>
          <div className='card-body items-center'>
            <button className='btn btn-primary w-64' value='mail'>
              Join by Mail
            </button>
            <p className='divider divider-vertical text-xl w-64 self-center'>Or...</p>
          </div>
        </section>

        <section>
          <div className='card-body'>
            <h2 className='text-xl border-b-2 w-full text-center'>Join Online Below</h2>
            <form>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}

export default SteaJoin;

import { MouseEvent, useState } from 'react';

import SteaJoinForm from '@/components/steajoinform';

function SteaJoin() {
  const [choice, setChoice] = useState('');

  function onButtonClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setChoice(event.currentTarget.value);
  }

  function FormTrack() {
    switch (choice) {
      case 'mail':
        return (<></>);

      case 'online':
        return (<SteaJoinForm />);

      default:
        return (
          <>
            <button className='btn btn-primary w-64' value='mail' onClick={onButtonClick}>
              Join by Mail
            </button>
            <p className='divider divider-vertical text-xl w-64 self-center'>Or...</p>
            <button className='btn btn-primary w-64' value='online' onClick={onButtonClick}>
              Join Online
            </button>
          </>
        );
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body items-center'>
          <FormTrack />
        </div>
      </div>
    </div>
  );
}

export default SteaJoin;

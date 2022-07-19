import SteaJoinForm from '@/components/forms';
import _ from 'lodash';
import { ChangeEvent, useState } from 'react';

function IndivdualMember() {
  const [formType, setFormType] = useState<FormType>();
  let radioVal: FormType | undefined = undefined;

  function handleRadioClick(e: ChangeEvent<HTMLInputElement>) {
    radioVal = e.target.value as FormType;
  }

  if (!_.isUndefined(formType)) {
    return (
      <div className='grid place-content-center h-full bg-opacity-50'>
        <div className='card w-fit bg-base-100 shadow-[0_0_10px_0_rgba(0,0,0,0.3)]'>
          <SteaJoinForm formType={formType}/>
        </div>
      </div>
    );
  }

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
            <h2>Membership Application type:</h2>
            <label className='label cursor-pointer'>
              <span className='label-text'>Indivdual</span>
              <input
                type='radio'
                className='radio radio-primary'
                name='app-type'
                value='indivdual'
                onChange={(e) => handleRadioClick(e)}
              />
            </label>

            <label className='label cursor-pointer'>
              <span className='label-text'>Family</span>
              <input
                type='radio'
                className='radio radio-primary'
                name='app-type'
                value='family'
                onChange={handleRadioClick}
              />
            </label>

            <label className='label cursor-pointer'>
              <span className='label-text'>Business</span>
              <input
                type='radio'
                className='radio radio-primary'
                name='app-type'
                value='business'
                onChange={handleRadioClick}
              />
            </label>

            <label className='label cursor-pointer'>
              <span className='label-text'>Horse Only</span>
              <input
                type='radio'
                className='radio radio-primary'
                name='app-type'
                value='horse'
                onChange={handleRadioClick}
              />
            </label>

            <button
              className='btn btn-primary'
              onClick={() => setFormType(radioVal)}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default IndivdualMember;

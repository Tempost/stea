import Input from '@/components/data-entry/Input';
import Modal from '@/components/styled-ui/Modal';
import { MemberCreateInputSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/MemberCreateInputSchema';
import useZodForm from '@/utils/usezodform';
import Form from '../Form';

function NewMemberForm() {
  const form = useZodForm({
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    schema: MemberCreateInputSchema,
    defaultValues: {
      businessName: null,
    },
  });

  const { register } = form;

  // TODO: Better type after creating form
  function onSubmit(formValues: any) { }

  return (
    <Modal
      buttonLabel='Add Show'
      onClick={() => {
        form.clearErrors();
        form.reset();
      }}
      ok={
        <button
          form='show-form'
          type='submit'
        >
          Add
        </button>
      }
    >
      <Form
        form={form}
        onSubmit={onSubmit}
      >
        <h3 className='text-lg font-bold'>Enter Member Information</h3>
        <div className='flex flex-row gap-5'>
          <Input />
        </div>
      </Form>
    </Modal>
  );
}

export default NewMemberForm;

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ErrorSpan, Field, Form, Input, Label } from '@/Components/form';
import { UserReq } from '@/Types/user';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormSchemaType = z.infer<typeof FormSchema>;
type AuthFormProps = {
  submitButtonText: string;
  handleFormSubmit: (value: UserReq) => void;
};

const AuthForm = ({ submitButtonText, handleFormSubmit }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (values: UserReq) => {
    handleFormSubmit(values);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" showErrorStyles={!!errors.email} {...register('email')} />
        {errors.email && <ErrorSpan>{errors.email.message}</ErrorSpan>}
      </Field>
      <Field>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" showErrorStyles={!!errors.password} {...register('password')} />
        {errors.password && <ErrorSpan>{errors.password.message}</ErrorSpan>}
      </Field>
      <div>
        <button type="submit">{submitButtonText}</button>
      </div>
    </Form>
  );
};

export default AuthForm;

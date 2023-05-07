import { SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface ISignInForm {
  email: string;
  password: string;
}

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignInForm>({ reValidateMode: 'onSubmit' });

  const onSubmit: SubmitHandler<ISignInForm> = ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.email}
        label="Email"
        variant="outlined"
        sx={{ marginTop: '20px', width: '100%' }}
        {...register('email', {
          required: 'Enter email',
          pattern: {
            value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
            message: 'Incorrect email',
          },
        })}
      />
      {errors.email?.message && <span className="auth__error">{errors.email?.message}</span>}
      <TextField
        type="password"
        error={!!errors.password}
        label="Password"
        variant="outlined"
        sx={{ marginTop: '20px', width: '100%' }}
        {...register('password', {
          required: 'Enter password',
          pattern: {
            value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
            message: 'Must contain at least one letter, one digit, one special character',
          },
          minLength: {
            value: 8,
            message: 'Must contain at least 8 characters',
          },
        })}
      />
      {errors.password?.message && <span className="auth__error">{errors.password?.message}</span>}
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        size="large"
        sx={{ marginTop: '20px', height: 53, width: '100%' }}
      >
        Sign In
      </Button>
    </form>
  );
}

export default SignInForm;
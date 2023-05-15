import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { ISingUpForm } from '../../types';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../../firebase';
import { useEffect } from 'react';

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISingUpForm>({ reValidateMode: 'onSubmit' });

  const onSubmit: SubmitHandler<ISingUpForm> = ({ name, email, password }) => {
    registerUser(name, email, password);
  };

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const registerUser = (name: string, email: string, password: string) => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/main');
  }, [user, loading]);

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.name}
        label={t('auth.name')}
        variant="outlined"
        sx={{ width: '100%' }}
        {...register('name', {
          required: 'Enter name',
          pattern: {
            value: /^[A-ZА-ЯЁ][a-zа-яё]+$/,
            message: 'Must contain only letters and start with a capital letter',
          },
          minLength: {
            value: 2,
            message: 'Must contain at least 2 characters',
          },
        })}
      />
      {errors.name?.message && <span className="auth__error">{errors.name?.message}</span>}
      <TextField
        error={!!errors.email}
        label={t('auth.email')}
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
        label={t('auth.password')}
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
        {t('auth.signup')}
      </Button>
    </form>
  );
}

export default SignUpForm;

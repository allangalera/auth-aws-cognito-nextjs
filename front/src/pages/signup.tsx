import { FC, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { Interpolation } from '@emotion/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
const yup = { object, string };
import { isAuthenticatedAtom } from '../store/atoms';
import { useRecoilState } from 'recoil';
import { Theme } from '../styles/theme';
import PageLayoutMain from '../components/PageLayoutMain';

const schema = yup.object({
  email: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

const schemaConfirmation = yup.object({
  passcode: yup.string().required('Campo obrigatório'),
});

type FormData = {
  email: string;
  password: string;
};

type FormDataConfirmation = {
  passcode: string;
};

const Login: FC = () => {
  const [, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const [nextStep, setNextStep] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const { register, handleSubmit, errors, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const confirmationForm = useForm<FormDataConfirmation>({
    resolver: yupResolver(schemaConfirmation),
  });

  const onSubmit = async data => {
    console.log(data);
    try {
      await Auth.signUp({
        username: data.email,
        password: data.password,
      });
      setUserEmail(data.email);
      setUserPassword(data.password);
      setNextStep(true);
      reset();
    } catch (e) {
      console.log(e.message);
    }
  };

  const onConfirmationSubmit = async data => {
    console.log(data);
    try {
      await Auth.confirmSignUp(userEmail, data.passcode);
      await Auth.signIn(userEmail, userPassword);
      setIsAuthenticated(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <PageLayoutMain>
      <h1>Signup</h1>
      {!nextStep ? (
        <form css={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" ref={register} />
          {errors.email && <span>This field is required</span>}

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" ref={register} />
          {errors.password && <span>This field is required</span>}

          <input type="submit" />
        </form>
      ) : (
        <form css={styles.FormContainer} onSubmit={confirmationForm.handleSubmit(onConfirmationSubmit)}>
          <label htmlFor="passcode">Verification Code</label>
          <input id="passcode" name="passcode" ref={confirmationForm.register} />
          {confirmationForm.errors.passcode && <span>This field is required</span>}

          <input type="submit" />
        </form>
      )}
    </PageLayoutMain>
  );
};

const styles = {
  FormContainer: (theme: Theme): Interpolation => ({
    display: 'flex',
    flexDirection: 'column',
  }),
};

export default Login;

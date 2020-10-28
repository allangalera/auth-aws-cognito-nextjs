import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Interpolation } from '@emotion/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
const yup = { object, string };
import { Theme } from '../styles/theme';
import PageLayoutMain from '../components/PageLayoutMain';
import Link from 'next/link';
import { Auth } from 'aws-amplify';
import { isAuthenticatedAtom } from '../store/atoms';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

const schema = yup.object({
  email: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

type FormData = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const [, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    console.log(data);
    try {
      await Auth.signIn(data.email, data.password);
      setIsAuthenticated(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <PageLayoutMain>
      <h1>Login</h1>
      <form css={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" ref={register} />
        {errors.email && <span>This field is required</span>}

        <label htmlFor="password">Password</label>
        <input id="password" name="password" ref={register} />
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
      <p>
        not an user yet?{' '}
        <Link href="/signup">
          <a>register now</a>
        </Link>
      </p>
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

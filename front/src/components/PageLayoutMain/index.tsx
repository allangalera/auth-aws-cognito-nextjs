import { FC, Fragment, useEffect, useState } from 'react';
import * as styles from './styles';
import HeaderMain from '../HeaderMain';
import { Auth } from 'aws-amplify';
import { isAuthenticatedAtom } from '../../store/atoms';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

type Props = {};

const ROUTES_AUTH_REDIRECT = ['/login', '/signup'];

const PageLayoutMain: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useState(true);

  const verifyIfAuthenticated = async () => {
    try {
      const session = await Auth.currentSession();
      shoudlRedirect(!!session);
    } catch (e) {
      console.log(e);
      shoudlRedirect();
    }
  };

  useEffect(() => {
    if (!isLoading) shoudlRedirect(isAuthenticated);
  }, [isAuthenticated]);

  const shoudlRedirect = (hasSession = false) => {
    setIsLoading(true);
    const { pathname } = router;
    if (hasSession) {
      setIsAuthenticated(true);
      if (ROUTES_AUTH_REDIRECT.includes(pathname)) {
        router.push('/');
      } else {
        setIsLoading(false);
      }
    } else {
      setIsAuthenticated(false);
      if (ROUTES_AUTH_REDIRECT.includes(pathname)) {
        setIsLoading(false);
      } else {
        router.push('/login');
      }
    }
  };

  useEffect(() => {
    verifyIfAuthenticated();
  }, []);

  if (isLoading) return <p>loading...</p>;

  return (
    <Fragment>
      <HeaderMain />
      <main css={styles.Container}>{children}</main>
    </Fragment>
  );
};

PageLayoutMain.defaultProps = {};

export default PageLayoutMain;

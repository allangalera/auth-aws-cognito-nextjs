import Link from 'next/link';
import { FC, MouseEvent } from 'react';
import { isAuthenticatedAtom } from '../../store/atoms';
import { useRecoilState } from 'recoil';
import { Auth } from 'aws-amplify';
import * as styles from './styles';

type Props = {};

const HeaderMain: FC<Props> = () => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);

  const handleSignOut = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    console.log('signout');
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      console.log('signout successfully');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <header css={styles.Container}>
      <Link href="/">
        <a>logo</a>
      </Link>{' '}
      {isAuthenticated ? (
        <a href="#" onClick={handleSignOut}>
          SignOut
        </a>
      ) : (
        <Link href="/login">
          <a>login</a>
        </Link>
      )}
    </header>
  );
};

HeaderMain.defaultProps = {};

export default HeaderMain;

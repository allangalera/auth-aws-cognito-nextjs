import { FC, MouseEvent } from 'react';
import PageLayoutMain from '../components/PageLayoutMain';
import { API, withSSRContext } from 'aws-amplify';
import { GetServerSidePropsContext } from 'next';

const Home: FC = props => {
  const handlePublicRequest = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await API.get('testApiCall', '/hiAll', null);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const handlePrivateRequest = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await API.get('testApiCall', '/hiUsers', null);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(props);
  return (
    <PageLayoutMain>
      <h1>Home</h1>
      <button onClick={handlePublicRequest}>Make Public Request</button>
      <button onClick={handlePrivateRequest}>Make Private Request</button>
    </PageLayoutMain>
  );
};

// type ServerSideProps = {
//   secureMessage?: string
// }

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { API } = withSSRContext(context);
  let response;
  try {
    response = await API.get('testApiCall', '/hiUsers', null);
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      secureMessage: response ? response.message : null,
    },
  };
};

export default Home;

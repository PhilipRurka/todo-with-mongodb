import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import Login from '@/Components/login';
import authOptions from '@/ServerUtils/authOptions';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('dashboard');
  }

  return <Login />;
};

export default LoginPage;

import { redirect } from 'next/navigation';

export default function LoginPageRoot() {
  redirect('/auth/login');
}

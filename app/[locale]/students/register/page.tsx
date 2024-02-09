import { redirect } from 'next/navigation'

import { readActiveRegistrationSession } from '@/app/api';
import StudentExcelFileUploadForm from './uploadForm';

export default async function Page() {
  const activeRegistrationSession = await readActiveRegistrationSession();

  if (activeRegistrationSession) {
    return redirect('/table');
  }

  return <StudentExcelFileUploadForm />;
}

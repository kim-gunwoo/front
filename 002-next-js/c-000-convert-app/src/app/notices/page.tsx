import { BASE_URL, guestApi } from '@/api';
import { NoticeInterface } from '@/types/Notice.types';
import NoticeContents from './Notice';

export default async function NoticesPage() {
  const notice = await getNoticeData();
  return <NoticeContents notice={notice} />;
}

async function getNoticeData(): Promise<NoticeInterface> {
  const resp = await fetch(BASE_URL + guestApi.login(), { method: 'POST' });
  const result = await resp.json();
  // 5abea465-eb4c-4e09-b3cb-14c2013893ac
  // 82979348-711d-4cc7-af2f-9bf2e807bb6e
  const id = '890c94d5-6519-45ba-902d-fc7bc8a6d32e';
  const res = await fetch(BASE_URL + '/v2/notices/' + id, {
    headers: {
      Authorization: `Bearer ${result.access_token}`,
    },
  });
  return await res.json();
}

import { BASE_URL } from '@/api';

interface StoreDetailProps {
  params: {
    id: string;
  };
}

async function getData(id: string) {
  const response = await fetch(BASE_URL + '/v2/stores/' + id);
  return await response.json();
}

export async function generateMetadata({ params: { id } }: StoreDetailProps) {
  const stores = await getData(id);
  return {
    title: stores.title,
  };
}

export default async function StoreDetail({ params: { id } }: StoreDetailProps) {
  await getData(id);

  return <div></div>;
}

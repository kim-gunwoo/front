export async function getTestData(): Promise<{ ran: number }> {
  try {
    const res = await fetch('http://localhost:3000/next/api/test/11111/33333');
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

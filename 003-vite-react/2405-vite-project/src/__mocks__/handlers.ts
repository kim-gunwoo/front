import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post(`${import.meta.env.VITE_API_BASE_URL}/v2/users/authentication`, async (request) => {
    console.log(request);

    return HttpResponse.json(
      {
        access_token: 'mock_token',
      },
      {
        status: 200,
      },
    );
  }),
];

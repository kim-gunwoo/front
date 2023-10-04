import { rest } from 'msw';

export const getSearchlist = rest.get('http://localhost:9999/api/search', (_, res, ctx) =>
  res(ctx.json([{ name: 'name-a' }, { name: 'name-b' }])),
);

"use server";

import { sql } from "@vercel/postgres";

export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  "use server";
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  const { rows } = await sql`
    SELECT slug, count
    FROM views
  `;

  return rows.map((row) => ({
    slug: row.slug,
    count: row.count,
  }));
}

export const incrementView = async (slug: string) => {
  await sql`
    INSERT INTO views (slug, count)
    VALUES (${slug}, 1)
    ON CONFLICT (slug) DO UPDATE SET count = views.count + 1 
  `;
};

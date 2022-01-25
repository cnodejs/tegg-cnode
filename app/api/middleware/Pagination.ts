import { EggContext, Next } from '@eggjs/tegg';

export async function Pagination(ctx: EggContext, next: Next) {
  const { page, limit } = ctx.query || {};

  ctx.pagination = {
    page: parseInt(page) || 0,
    limit: parseInt(limit) || 10,
  };

  await next();
}

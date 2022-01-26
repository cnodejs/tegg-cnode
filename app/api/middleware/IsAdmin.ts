import { EggContext, Next } from '@eggjs/tegg';

export async function IsAdmin(ctx: EggContext, next: Next) {
  if (!ctx.state?.user?.is_admin) {
    ctx.throw('no permission', 403);
  }
  await next();
}

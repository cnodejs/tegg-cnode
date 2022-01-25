import { EggContext, Next } from '@eggjs/tegg';

export async function IsAdmin(ctx: EggContext, next: Next) {
  if (!ctx.state?.user?.is_admin) {
    ctx.throw('You Need Admin Permission To Perform This Action', 403);
  }
  await next();
}

import { Context, Next } from "koa";

import { HTTPError } from "common/Errors";

export async function httpErrorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    if (error instanceof HTTPError) {
      ctx.status = error.status;

      ctx.body = {
        message: error.message,
        info: error.info,
      };
    } else {
      throw error;
    }
  }
}

import { Context, Next } from "koa";

import { HTTPError } from "utils/Errors";

/**
 * Catch some errors and send the information to the client.
 */
export default async function catchHTTPError(ctx: Context, next: Next) {
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

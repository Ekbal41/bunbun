import { BunbunRouter } from "./router";
import { Context } from "./context";
import { ICallback } from "./interfaces";
import { TMethods } from "./types";

export class Handler {
  #router = new BunbunRouter();

  register(method: TMethods, path: string, callbacks: ICallback[]): void {
    this.#router.store(method, path, callbacks);
  }

  registerMiddleware(lkey: string | ICallback, callbacks: ICallback[]): void {
    this.#router.storeMiddleware(lkey, callbacks);
  }

  async handleHttp(ctx: Context): Promise<Response> {
    const method = ctx.method;
    const path = ctx.path;
    const { params, callbacks, middlewires } = this.#router.find(method, path);

    if (callbacks === null || callbacks.length === 0)
      return new Response(null, {
        status: 404,
      });

    ctx.params = params;

    // run the global middlewires
    if (middlewires.length > 0) {
      for (const md of middlewires) {
        ctx = await Promise.resolve(md(ctx));
      }
    }
    for (const cb of callbacks) {
      ctx = await Promise.resolve(cb(ctx));
    }
    return ctx.res;
  }
}

import { Errorlike, Serve, Server } from "bun";
import { Context } from "./context";
import { Handler } from "./handler";
import { ICallback, IListen } from "./interfaces";
import { TMethods } from "./types";

export class Bunbun {
  #handler = new Handler();

  get(path: string, ...callbacks: ICallback[]): void {
    this.#handleMethod("GET", path, callbacks);
  }

  use(lkey: string | ICallback, ...callbacks: ICallback[]): void {
    this.#handler.registerMiddleware(lkey, callbacks);
  }

  #handleMethod(method: TMethods, path: string, callbacks: ICallback[]) {
    this.#handler.register(method, path, callbacks);
  }
  onError = (
    err: Errorlike
  ): Response | Promise<Response> | undefined | Promise<undefined> => {
    console.error(err);
    return new Response("Internal Server Error", {
      status: 500,
    });
  };

  onNotFound = (ctx: Context): Response | Promise<Response> => {
    return new Response("404 Not Found", {
      status: 404,
    });
  };
  #serve(listen: IListen): Serve {
    const handler = this.#handler;
    const onError = this.onError;
    const onNotFound = this.onNotFound;
    return {
      //----------------------------------
      // this handles http requests
      async fetch(req: Request, server: Server) {
        const ctx = new Context(req, server);
        const res = await handler.handleHttp(ctx);
        if (res.status === 404) return onNotFound(ctx);
        return res;
      },
      //----------------------------------
      port: listen.port || 3000,
      hostname: listen.hostname || "0.0.0.0",
      development: listen.development || false,
      lowMemoryMode: listen.lowMemoryMode || false,
      error(err: Error) {
        return onError(err);
      },
    };
  }
  listen(options: IListen = {}): Server {
    return Bun.serve(this.#serve(options));
  }
}

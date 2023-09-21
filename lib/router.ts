import { TMethods } from "./types";
import { pathToRegexp } from "path-to-regexp";
import { ICallback, IRouterResponse } from "./interfaces";
import { getbase } from "./utils";

export class BunbunRouter {
  #routes = [];
  #mids = [];
  #bmids = [];

  store(method: TMethods, path: string, callbacks: ICallback[]) {
    const keys = [];
    const re = pathToRegexp(path, keys);
    this.#routes.push({ method, path, callbacks, re, keys });
  }

  storeMiddleware(lkey: string | ICallback, callbacks: ICallback[]) {
    if (typeof lkey === "string" && lkey === "/") {
      this.#mids.push(...callbacks);
    } else if (typeof lkey === "function") {
      this.#mids.push(lkey, ...callbacks);
    } else if (typeof lkey === "string") {
      lkey = getbase(lkey);
      this.#bmids[lkey as string] = [...callbacks];
    }
  }

  find(method: string, path: string): IRouterResponse {
    const params = {};
    const callbacks = [];
    const middlewires = [...this.#mids];

    for (let i = 0; i < this.#routes.length; i++) {
      const { method: m, re, keys: k, callbacks: h } = this.#routes[i];
      if (m === method) {
        const match = re.exec(path);
        const base = getbase(path);
        if (!match) continue;
        if (match) {
          for (let i = 0; i < k.length; i++) {
            const { name } = k[i];
            params[name] = match[i + 1];
          }
          h.length > 0 && callbacks.push(...h);
          if (this.#bmids[base]) {
            middlewires.push(...this.#bmids[base]);
          }
        }
      }
    }
    if (callbacks.length > 0 || Object.keys(params).length > 0) {
      return { params, callbacks, middlewires };
    } else return { params: {}, callbacks: null };
  }
}

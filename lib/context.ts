import { Server } from "bun";

export class Context {
  params = {};
  req: Request;
  server: Server;
  res: Response | null;
  readonly url: URL;
  readonly host: string;
  readonly path: string;
  readonly method: string;
  readonly query: URLSearchParams;
  readonly headers: Request["headers"];
  constructor(req: Request, server: Server) {
    const url = new URL(req.url);
    this.req = req;
    this.res = null;
    this.url = url;
    this.host = url.host;
    this.server = server;
    this.path = url.pathname;
    this.method = req.method;
    this.headers = req.headers;
    this.query = url.searchParams;
  }

  sendText = (text: string, options: ResponseInit = { headers: {} }) => {
    this.res = new Response(text, options);
    return this;
  };
}

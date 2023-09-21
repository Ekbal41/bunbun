import { Context } from "./context";

export interface ICallback {
  (ctx: Context): Context | Promise<Context>;
}

export interface IRouterResponse {
  callbacks: ICallback[] | null;
  params: { [key: string]: string };
  middlewires?: ICallback[];
}

export interface IListen {
  port?: number;
  hostname?: string;
  development?: boolean;
  lowMemoryMode?: boolean;
}

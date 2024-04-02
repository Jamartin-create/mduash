import "reflect-metadata";
import { Router } from "express";

// 唯一路由
export class AppRouter {
  static router: Router;
  static getInstance() {
    if (!AppRouter.router) {
      AppRouter.router = Router();
    }
    return AppRouter.router;
  }
}

type T_METHOD = "get" | "post" | "delete" | "put";
type T_METHOD_KEY = "GET" | "POST" | "DELETE" | "PUT";
type T_METHOD_KEYS = {
  [key in T_METHOD_KEY]: T_METHOD;
};

const METHOD_KEYS: T_METHOD_KEYS = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "put",
};

const META_KEYS = {
  PATH: "PATH",
  METHOD: "METHOD",
};

// @Controller
export function Controller(prefix: string) {
  const router = AppRouter.getInstance();
  return function (target: any) {
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      const routeHandler = target.prototype[key];
      const method: T_METHOD = Reflect.getMetadata(
        META_KEYS.METHOD,
        target.prototype,
        key
      );
      const path = Reflect.getMetadata(META_KEYS.PATH, target.prototype, key);
      if (!path || !method) return;
      router[method](`${prefix}${path}`, routeHandler);
    });
  };
}

// @[Method]
function createMethod(method: T_METHOD) {
  return function (path: string) {
    return function (target: any, protoMehodName: string, _: any) {
      Reflect.defineMetadata(META_KEYS.METHOD, method, target, protoMehodName);
      Reflect.defineMetadata(META_KEYS.PATH, path, target, protoMehodName);
    };
  };
}

export const Get = createMethod(METHOD_KEYS.GET);
export const Post = createMethod(METHOD_KEYS.POST);
export const Put = createMethod(METHOD_KEYS.PUT);
export const Delete = createMethod(METHOD_KEYS.DELETE);

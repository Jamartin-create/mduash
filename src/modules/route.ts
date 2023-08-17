import { MError } from './exception'

// 普通数值返回值类型
export type ResultType<T> = {
  code: number
  msg: string
  data?: T
}

// 分页数据类型
export type PageType = {
  total: number
  limit: number
  offset: number
}

// 分页数据返回类型
export type PageResultType<T> = ResultType<T> | PageType

/**
 * @description 成功请求返回的数据格式
 * @param data 返回的数据
 * @param msg 向前端传递的信息
 * @returns
 */
export function SuccessRes<T>(
  data: T | undefined,
  msg?: string
): ResultType<T> {
  return {
    code: 0,
    msg: msg || 'success',
    data: data,
  }
}

/**
 * @description 失败请求返回的数据格式
 * @param error 异常事件
 * @returns
 */
export function ErrorRes(error: Error): ResultType<null> {
  return {
    code: error instanceof MError ? error.code : -1,
    msg: error instanceof MError ? error.msg : error.message,
    data: null,
  }
}

/**
 * @description 分页请求成功响应数据
 * @param data 数组类型
 * @param pageInfo 分页数据
 * @param msg 信息
 * @returns
 */
export function PageSuccessRes<T>(
  data: T[],
  pageInfo: PageType,
  msg?: string
): PageResultType<T> {
  const result = SuccessRes<T[]>(data, msg)
  return {
    ...result,
    ...pageInfo,
  }
}

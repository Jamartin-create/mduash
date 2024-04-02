/**
 * @description MDU 错误对象
 */
export class MError extends Error {
  public code: number;
  public msg: string;
  public name: string;

  /**
   * @param code 错误码
   * @param msg 错误信息
   */
  constructor(code: number, msg: string) {
    super(msg);
    this.code = code;
    this.msg = msg;
    this.name = "MError";
  }
}

/**
 * @description 构造错误对象（自定义错误信息创建工厂）
 * @param code 错误码
 * @param msg 错误信息
 * @returns
 */
export function generatorMError(code: number, msg: string): MError {
  return new MError(code, msg);
}

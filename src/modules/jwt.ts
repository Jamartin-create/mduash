import jwt from "jsonwebtoken";

/**
 * @description JWT 校验相关工具
 */
export class JWT {
  /** @description 盐值 */
  private salt: string;
  /** @description 有效期  */
  private expires: string | undefined; // 默认24h

  /**
   * @constructor
   * @param salt 盐值
   * @param expires 有效期
   */
  constructor(salt: string, expires?: string) {
    this.salt = salt;
    this.expires = expires;
  }

  /**
   * @description 注册token
   * @param data 要加密的数据
   * @param options jwt 配置项
   * @returns
   */
  public sign(data: any, options: jwt.SignOptions): string {
    return jwt.sign(data, this.salt, {
      expiresIn: this.expires || "24h",
      ...options,
    });
  }

  /**
   * @description 验证 token
   * @param token 要验证的 token
   * @returns
   */
  public verify(token: string): boolean | string | jwt.JwtPayload {
    try {
      return jwt.verify(token, this.salt);
    } catch (e) {
      return false;
    }
  }
}

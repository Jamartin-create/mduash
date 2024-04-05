/**
 * MDU 错误对象
 * @description 用于规范异常码的配置
 */
export class MError extends Error {
    public code: number
    public msg: string
    public name: string

    /**
     * @param code 错误码
     * @param msg 错误信息
     */
    constructor(code: number, msg: string, name: string = 'MError') {
        super(msg)
        this.code = code
        this.msg = msg
        this.name = name
    }

    /**
     * 自定义新的异常文案
     * @description 假设统一文案不能完全满足某个业务的异常返回文案，可以通过该方法自定义，错误文案返回格式：【Error名】+【文案】
     * @param newMsg 新异常文案
     */
    withMsg(newMsg: string): MError {
        return new MError(this.code, this.name + ':' + newMsg)
    }
}

/**
 * @description 构造错误对象（自定义错误信息创建工厂）
 * @param code 错误码
 * @param msg 错误信息
 * @returns
 */
export function generatorMError(
    code: number,
    msg: string,
    name?: string
): MError {
    return new MError(code, msg, name)
}

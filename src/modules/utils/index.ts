/**
 * @description await 回调处理
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function to<T, U = Error>(
    promise: Promise<T>,
    errorExt?: object
): Promise<[U, undefined] | [null, T]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, undefined]>((err: U) => {
            if (errorExt) {
                const parsedError = Object.assign({}, err, errorExt)
                return [parsedError, undefined]
            }

            return [err, undefined]
        })
}

/**
 * @description 预制生成方法
 */
export class Gen {
    /**
     * @description 生成 guid
     * @returns {String}
     */
    static guid() {
        let d = new Date().getTime()
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = (d + Math.random() * 16) % 16 | 0
            d = Math.floor(d / 16)
            return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
        })
    }
}

export class Validate {
    /**
     * @description 校验参数
     * @param {String} data 被校验的字符串
     * @param {String} type 可选值：email、phone
     * @returns
     */
    static validateParam(data: string, type: 'email' | 'phone') {
        if (type === 'email') {
            return new RegExp(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            ).test(data)
        } else if (type === 'phone') {
            return new RegExp(
                /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            ).test(data)
        } else {
            return false
        }
    }
}

export class Is {
    /**
     * @description 判断参数是否为空
     * @param value 要判断的参数
     */
    static isEmpty(value: any) {
        if (value === null || value === undefined) return true
        const type = typeof value

        switch (type) {
            case 'string':
                return value.trim() === '' // 判断字符串是否为空
            case 'number':
                return false // 数字不为空
            case 'object':
                if (Array.isArray(value)) {
                    return value.length === 0 // 判断数组是否为空
                } else {
                    return Object.keys(value).length === 0 // 判断对象是否为空
                }
            default:
                return false // 其他类型不为空
        }
    }
}

export default to

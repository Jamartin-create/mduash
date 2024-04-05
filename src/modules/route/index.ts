import { ErrorCode } from '../../utils/errorCode'
import { MError } from '../exception'
import { Is } from '../utils'

// 普通数值返回值类型
export type MResponseType<T> = {
    code: number
    msg: string
    data?: T
}

// 分页数据返回值类型
export type MPageResponseType<T> = {
    list: T[]
    count: number
    pageCount: number
    hasNext: boolean
    hasPrev: boolean
}

type MResponseOptionType = {
    defaultSuccessText: string
    defaultErrorText: string
}

type MPageRequestType = {
    pageSize: number
    pageIndex: number
}

export class MResponse {
    private options: Partial<MResponseOptionType>

    /**
     * @param options 基础配置
     */
    constructor(options: Partial<MResponseOptionType> = {}) {
        this.options = options
    }

    /**
     * @description 返回成功数据
     * @param msg 成功响应文案
     */
    success<T>(data: T, msg?: string): MResponseType<T> {
        return {
            code: 0,
            msg: msg || this.options.defaultSuccessText || 'success',
            data
        }
    }

    /**
     * @description 返回失败数据
     * @param err 报错详情
     */
    error(err: Error): MResponseType<null> {
        const errRes = {
            code: -1,
            msg: err.message || this.options.defaultErrorText || 'error'
        }
        if (err instanceof MError) {
            errRes.code = err.code
            errRes.msg = err.msg
        }
        return { ...errRes, data: null }
    }

    /**
     * 获取分页参数 - hook
     * @description 获取 SQL 需要的 order 参数（limit & offset，以及获取返回值的方法）
     * @param {MPageRequestType} params 分页参数
     */
    static getPageParams<T>(params: MPageRequestType) {
        const { pageIndex, pageSize } = params
        if (Is.isEmpty(pageIndex) || Is.isEmpty(pageSize)) {
            throw ErrorCode.withMsg('分页参数传的不是很全')
        }

        const limit = pageSize
        const offset = pageIndex

        /**
         * 获取分页结果
         * @description 根据列表和数据数量总和计算出分页的相关参数（比如是否还有下一页、上一页，总共有多少页……）
         * @param list 列表数据
         * @param count 列表全部数据数量
         * @returns
         */
        function getPageResult(list: T[], count: number): MPageResponseType<T> {
            const pageCount = Math.ceil(count / limit)
            const hasNext = offset + 1 < pageCount
            const hasPrev = offset > 0
            return { list, count, pageCount, hasNext, hasPrev }
        }

        return {
            order: { limit, offset: offset * limit },
            limit,
            offset,
            getPageResult
        }
    }
}

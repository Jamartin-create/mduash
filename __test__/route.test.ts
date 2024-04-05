import { generatorMError } from '../src/modules/exception'
import { MResponse } from '../src/modules/route'

const MR = new MResponse()

describe('Success response test', () => {
    test('Data & msg', () => {
        expect(
            MR.success<{ name: string }>({ name: 'ddd' }, 'some msg')
        ).toEqual({
            code: 0,
            msg: 'some msg',
            data: { name: 'ddd' }
        })
    })
    test('Data &out msg', () => {
        expect(MR.success<{ name: string }>({ name: 'ddd' })).toEqual({
            code: 0,
            msg: 'success',
            data: { name: 'ddd' }
        })
    })
})

describe('Error response test', () => {
    test('MDU-Error', () => {
        expect(MR.error(generatorMError(90001, 'MDUError msg'))).toEqual({
            code: 90001,
            msg: 'MDUError msg',
            data: null
        })
    })
    test('Error', () => {
        expect(MR.error(new Error('Error msg'))).toEqual({
            code: -1,
            msg: 'Error msg',
            data: null
        })
    })
})

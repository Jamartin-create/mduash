import { generatorMError } from '../src/modules/exception'
import { ErrorRes, PageSuccessRes, SuccessRes } from '../src/modules/route'

describe('Success response test', () => {
  test('Data & msg', () => {
    expect(SuccessRes<{ name: string }>({ name: 'ddd' }, 'some msg')).toEqual({
      code: 0,
      msg: 'some msg',
      data: { name: 'ddd' },
    })
  })
  test('Data &out msg', () => {
    expect(SuccessRes<{ name: string }>({ name: 'ddd' })).toEqual({
      code: 0,
      msg: 'success',
      data: { name: 'ddd' },
    })
  })
})

describe('Page response test', () => {
  test('Data & pageInfo', () => {
    expect(
      PageSuccessRes([1, 2, 3], { total: 3, limit: 3, offset: 0 })
    ).toEqual({
      code: 0,
      msg: 'success',
      data: [1, 2, 3],
      offset: 0,
      limit: 3,
      total: 3,
    })
  })
})

describe('Error response test', () => {
  test('MDU-Error', () => {
    expect(ErrorRes(generatorMError(90001, 'MDUError msg'))).toEqual({
      code: 90001,
      msg: 'MDUError msg',
      data: null,
    })
  })
  test('Error', () => {
    expect(ErrorRes(new Error('Error msg'))).toEqual({
      code: -1,
      msg: 'Error msg',
      data: null,
    })
  })
})

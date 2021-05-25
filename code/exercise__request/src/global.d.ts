interface RawResponse<T> {
  data: T | void
  result: {
    code: number
    msg:  string
  }
}

export type U3Response<T> = Promise<RawResponse<T>>
export type RequestOptions = {
  headers?: { [key: string]: any }
  body?: any
  qs?: any
  method?: string
  baseUrl?: string
  url?: string
}

export type Response = {
  statusCode: number
  headers: { [key: string]: any }
  body: any // Buffer, string, stream.Readable, or a plain object if `json` was truthy
}

export interface HTTPRequest {
  (options: RequestOptions): Promise<Response>
}

export interface LoginResponse {
    statusCode: number
    data: Data
  }
  
  export interface Data {
    id: number
    username: string
    token: string
  }
export interface SemesterResponse {
    statusCode: number
    data: Daum[]
  }
  
  export interface Daum {
    id: number
    title: string
    status: string
  }
  
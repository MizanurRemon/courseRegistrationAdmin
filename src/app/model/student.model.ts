export interface StudentResponse {
    statusCode: number
    data: Daum[]
  }
  
  export interface Daum {
    id: number
    name: string
    phone: string
    roll_no: string
    image: string
    status: string
    created_at: string
    updated_at: string
  }
  
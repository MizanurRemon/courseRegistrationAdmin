export interface RegisteredCourses {
    statusCode: number
    data: Daum[]
  }
  
  export interface Daum {
    id: number
    status: string
    semester: Semester
    course: Course
    student: Student
    created_at: string
    updated_at: any
  }
  
  export interface Semester {
    id: number
    title: string
    status: string
  }
  
  export interface Course {
    id: number
    title: string
    credits: number
    status: string
  }
  
  export interface Student {
    id: number
    name: string
    phone: string
    roll_no: string
    image: string
    status: string
    created_at: string
    updated_at: string
  }
  
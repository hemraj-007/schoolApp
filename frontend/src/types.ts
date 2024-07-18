export interface IClass {
    id?: string;
    class_name: string;
    year: number;
    teacher: string;
    student_fees: number;
    student_list: string[];
  }
  
  export interface ITeacher {
    id?: string;
    name: string;
    gender: string;
    DOB: string;
    contact_details: string;
    salary: number;
    assigned_class: string;
  }
  
  export interface IStudent {
    id?: string;
    name: string;
    gender: string;
    DOB: string;
    contact_details: string;
    fees_paid: number;
    class: string;
  }
  
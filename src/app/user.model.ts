
export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  export interface User {
    name: string;
    email: string;
    mobile: string;
    gender: string;
    role: string;
    addresses: Address[];
  }
  
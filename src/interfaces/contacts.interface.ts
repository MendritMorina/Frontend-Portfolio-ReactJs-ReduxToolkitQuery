export interface ContactState {
  showMessageModal: boolean
  selectedItemForMessage: any;
  sendEmailData: {
    name: string,
    lastName: string,
    email: string,
    message:string,
  };
}

export interface ContactRoot{
  contacts: ContactState;
}

export interface Contact{
  id?: string;
  name: string;
  lastName: string;
  email: string;
  message: string;
  createdAt?: Date;
}

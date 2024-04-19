export interface AppState {
  selectedItemIndex: number;
  showAddEditModal: boolean;
  selectedItemForEdit: any;
  showDeleteModal: boolean;
  selectedItemForDelete: any;
  currentModalType: any;
}

export interface AppRoot{
  app: AppState;
}




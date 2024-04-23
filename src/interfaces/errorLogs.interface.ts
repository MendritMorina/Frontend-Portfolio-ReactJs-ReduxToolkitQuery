export interface ErrorLogState {
    showBodyModal: boolean;
    selectedItemForBody: any;
}

export interface ErrorLogRoot{
    errorLogs: ErrorLogState;
}

export interface ErrorLog{
    id: string;
    controllerName: string;
    body: string;
    createdAt: Date;
}

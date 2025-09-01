export interface Note {
     title: string;
    content: string;
    dateCreated: string;
    _id: string; // MongoDB document ID and same for localStorage
    updatedAt?: string;
}
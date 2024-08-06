// types.ts



export interface Message {
  id: string;
  userId: string;
  username: string,
  message: string;
  timestamp: number;
}

export interface PetProfile {
  id: string;
  petName: string;
  petPhoto: string;
  petType: string;
  petBreed: string;
  petAge: number;
  location: string;
  description: string;
  tags: string;
  creationTimestamp?: string;
  lastUpdateTimestamp?: string;
  published: boolean;
  userId: string;
}

export interface filterOptions  {
  pet: string,
  selected: boolean,
  on: boolean,
  otherTypes?: string[],
}


export interface CardItems {
  id: string;
  name: string; 
  tags: string;
  location: string; 
  breed: string;
  type: string; 
  age: number;
  photo: string;
}
import { v4 as uuidv4 } from 'uuid';
import { filterOptions, } from "../types"

export const createListingInitialData = {
    id: uuidv4(),
    petName: "",
    petPhoto: "",
    petType: "",
    petBreed: "",
    petAge: 1,
    location: "",
    description: "",
    tags: "",
    userId: "4992d8fe-9dee-48c7-90d2-07b3c1278145",
    published: false,
  }
  
export const filterListingOptionsArray :filterOptions[] = [
    {
    pet: "Dog",
    selected: false,
    on: true
    },
    {
    pet: "Cat",
    selected: false,
    on: true
    },
    {
    pet: "Other",
    selected: false,
    on: true,
    }
]
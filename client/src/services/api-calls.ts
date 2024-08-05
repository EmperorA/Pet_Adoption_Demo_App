import { PetProfile } from "../types";

const baseUrl = "https://http://localhost:8000/v1"

export async function getListings():Promise<{ items: PetProfile[] }> {

    try {
        const response = await 
        fetch(`${baseUrl}/listings/search?&pageSize=10`);
        const animalsForAdoption = await response.json();
        return animalsForAdoption
    }

    catch(err) {
        console.log(err)
        return { items: [] }
    }
}

export async function getSingleListing(id :string):Promise<PetProfile> {
        const response = await fetch(`${baseUrl}/listing/${id}`);
        return await response.json();
}

export async function postNewListing(data :PetProfile):Promise<Response> {
    const response = await fetch(`${baseUrl}/listing`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    })
    return response
}

export async function updateListing(data :PetProfile):Promise<Response> {
    const response = await fetch(`${baseUrl}/listing/${data.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    })
    return response
}
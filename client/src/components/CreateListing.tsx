import { useState, useEffect } from "react"
import { PetProfile } from "../types"
import { createListingInitialData } from "../data/listingsData"

import styles from "./createListing.module.css"
import { postNewListing } from "../services/api-calls"
import { useAuth } from '../AuthContext'

export default function Discover() {
    const {user} = useAuth();

    
    const [statusMsgOnSubmit, setStatusMsgOnSubmit] = useState('')
    const [formData, setFormData] = useState<PetProfile>({...createListingInitialData, userId: user ? user.id: ""})


    useEffect(() => {
        if (user && user.role === 'admin') {
            setFormData(prevFormData => ({
                ...prevFormData,
                userId: user.id
            }));
        }
    }, [user]);
     if (!user) {
    return;
  }
    // change any later when figure out type of event
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleChange(event :any) {
        setFormData( (prevFormData :PetProfile) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.type === 'checkbox' ? 
                                     event.target.checked : 
                                     event.target.value
            }
        })
    }

    // Ensuring petAge gets passed as a number to the API
    // Ensuring petType has a capitalized first letter for filters to work properly
    const dataToSend :PetProfile = {

        ...formData,

        petAge: typeof formData.petAge !== "number" ? 
        parseInt(formData.petAge, 10) : 
        formData.petAge,

        petType: formData.petType.charAt(0).toUpperCase() + 
        formData.petType.slice(1)
    };

    // move later to /services? : api calls post, update, delete...
    async function retrieveResponseFromPostListing(data: PetProfile) {
        const response = await postNewListing(data);
        if (!response.ok) {
            console.log('Failed to post data', response.status);
            setStatusMsgOnSubmit(`Failed to post data: ${String(response.status)}`);
        } else {
            const result = await response.json();
            console.log("Data posted successfully", result);
            setStatusMsgOnSubmit(result.error ? result.error : result.message);
            setTimeout(() => {
                setStatusMsgOnSubmit('');
            }, 3000);
        }
    }
    // change any later when figure out type of event
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleSubmit(e: any) {
        e.preventDefault();
        if (user && user.role === 'admin') {
            retrieveResponseFromPostListing(dataToSend);
            setFormData(createListingInitialData);
        } else {
            setStatusMsgOnSubmit('Only admins can create listings.');
        }
    }

    return (
        <div className={styles.formContainer}>
            <h2>New Listing</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <label>
                    Pet Name
                    <input 
                        type="text"
                        placeholder="Pet Name"
                        onChange={event => handleChange(event)}
                        name="petName"
                        value={formData.petName}
                        // required
                    />
                </label>
                <label>
                    Pet Photo
                    <input 
                        type="text"
                        placeholder="Pet Photo"
                        onChange={event => handleChange(event)}
                        name="petPhoto"
                        value={formData.petPhoto}
                        // required
                    />
                </label>
                <label>
                    Pet Type
                    <input 
                        type="text"
                        placeholder="Pet Type"
                        onChange={event => handleChange(event)}
                        name="petType"
                        value={formData.petType}
                        // required
                    />
                </label>
                <label>
                    Pet Breed
                    <input 
                        type="text"
                        placeholder="Pet Breed"
                        onChange={event => handleChange(event)}
                        name="petBreed"
                        value={formData.petBreed}
                    />
                </label>
                <label>
                    Pet Age (Min = 1)
                    <input 
                        type="number"
                        placeholder="Pet Age"
                        onChange={event => handleChange(event)}
                        name="petAge"
                        value={formData.petAge}
                        // required
                    />
                </label>
                <label>
                    Location
                    <input 
                        type="text"
                        placeholder="Location"
                        onChange={event => handleChange(event)}
                        name="location"
                        value={formData.location}
                        // required
                    />
                </label>
                <label>
                    Description
                    <input 
                        type="text"
                        placeholder="Description"
                        onChange={event => handleChange(event)}
                        name="description"
                        value={formData.description}
                    />
                </label>
                <label>
                    Tags
                    <input 
                        type="text"
                        placeholder="Tags"
                        onChange={event => handleChange(event)}
                        name="tags"
                        value={formData.tags}
                    />
                </label>
                <label>
                    Published
                    <input 
                        type="checkbox"
                        placeholder="Published"
                        onChange={event => handleChange(event)}
                        name="published"
                        checked={formData.published}
                    />
                </label>
                <label>
                    User ID
                    <input  
                        type="text"
                        placeholder="User Id"
                        // onChange={event => handleChange(event)}
                        name="userId"
                        value={formData.userId}
                        disabled
                    />
                </label>
                <button
                    className={styles.submitBtn} 
                    type="submit" 
                    >Create new listing
                </button>
                {statusMsgOnSubmit && 
                <div>
                    <p className={styles.submitMsg}>
                        {statusMsgOnSubmit}
                    </p>
                </div>}
            </form>
        </div>
    )
}
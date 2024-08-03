import { useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';

import { PetProfile } from '../types';
import { getSingleListing } from '../services/api-calls';

import styles from "./PetPage.module.css";

import Tags from './Tags';
import locationPin from "../assets/location-pin.svg"

export default function PetPage() {
    const { id } = useParams();
    const [data, setData] = useState<PetProfile>({
        id: "",
        petName: "",
        petPhoto: "",
        petType: "",
        petBreed: "",
        petAge: 1,
        location: "",
        description: "",
        tags: "",
        userId: "",
        published: false,
    });

    useEffect(() => {
        // change any later (id comes from useParams)
        async function retrieveSingleListing(id: any) {
        setData(await getSingleListing(id))
        }
        retrieveSingleListing(id)
    },[id])

    return (
    <div>
        <h2 className={styles.title}>{data.petName} ● {data.petAge} year(s) old</h2>
        <div className={styles.location}>
            <img className={styles.locationPin} src={locationPin} alt="location pin" />
            <p>{data.location}</p>
        </div>
        {/* move to own component Tags */}
        <div className={styles.tags}>
            <Tags 
            tags={data.tags}/>
        </div>
        <div className='About'>
            <h3 className={styles.title}>About</h3>
            <div className={styles.aboutGrid}>
                <div className={styles.aboutBlock}>
                    <p className={styles.aboutTitle}>Type</p>
                    <p className={styles.aboutDesc}>{data.petType}</p>
                </div>
                <div className={styles.aboutBlock}>
                    <p className={styles.aboutTitle}>Breed</p>
                    <p className={styles.aboutDesc}>{data.petBreed}</p>
                </div>
                <div className={styles.aboutBlock}>
                    <p className={styles.aboutTitle}>Type</p>
                    <p className={styles.aboutDesc}>{data.petType}</p>
                </div>
                <div className={styles.aboutBlock}>
                    <p className={styles.aboutTitle}>Breed</p>
                    <p className={styles.aboutDesc}>{data.petBreed}</p>
                </div><div className={styles.aboutBlock}>
                    <p className={styles.aboutTitle}>Type</p>
                    <p className={styles.aboutDesc}>{data.petType}</p>
                </div>
                <div className={styles.aboutBlock}>
                    <p className={styles.aboutTitle}>Breed</p>
                    <p className={styles.aboutDesc}>{data.petBreed}</p>
                </div>
            </div>
        </div>
        <div className='Description'>
            <h3 className={styles.title}>Meet {data.petName}</h3>
            <p className={styles.desc}>{data.description}</p>
        </div>
    </div>
    );
}

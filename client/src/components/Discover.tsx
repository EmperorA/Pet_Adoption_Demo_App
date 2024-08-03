import { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import PetCard from "./PetCard";
import FilterButton from "./FilterButton";

import styles from "./Discover.module.css";
import { filterOptions, PetProfile } from "../types";
import { filterListingOptionsArray } from "../data/listingsData";

import Dog from "../assets/dogBtn.svg";
import Cat from "../assets/catBtn.svg";
import Other from "../assets/otherAnimalsBtn.svg";
import { getListings } from "../services/api-calls";

export default function Discover() {
  const [data, setData] = useState<{ items: PetProfile[] }>({ items: [] });
  const [filterBtn, setFilterBtn] = useState<filterOptions[]>(filterListingOptionsArray);

  useEffect(() => {
    async function retrieveData() {
      const retrievedData = await getListings();
      setData(retrievedData);
      updateOtherAnimals(retrievedData.items);
    }
    retrieveData();
  }, []); // Empty dependency array means this runs once on mount

  // Memoize createFilteredPetArray to avoid unnecessary recreations
  const createFilteredPetArray = useCallback((filterState: filterOptions[]): string[] => {
    const filteredPetArray = filterState.map((item: any) => (item.on ? item.pet : ""));
    filteredPetArray[2] = filterBtn[2].otherTypes;
    return filteredPetArray;
  }, [filterBtn]); // Only re-compute when filterBtn changes

  // Recompute filtered pets whenever filterBtn or data changes
  useEffect(() => {
    createFilteredPetArray(filterBtn);
  }, [filterBtn, data, createFilteredPetArray]);

  function updateOtherAnimals(items: PetProfile[]) {
    const petTypes: string[] = items
      .map((i) => (i.petType !== "Dog" && i.petType !== "Cat" ? i.petType : null))
      .filter(Boolean) as string[];

    setFilterBtn((prevSelected) =>
      prevSelected.map((item) =>
        item.pet === "Other" ? { ...item, otherTypes: petTypes } : item
      )
    );
  }

  function unselectFilterButton() {
    setFilterBtn((prevSelected) =>
      prevSelected.map((item) => ({ ...item, selected: false, on: true }))
    );
  }

  function selectFilterButton(selection: string) {
    setFilterBtn((prevSelected) =>
      prevSelected.map((item) =>
        item.pet === selection ? { ...item, selected: true, on: true } : { ...item, selected: false, on: false }
      )
    );
  }

  function petCardBuilder(pet: PetProfile) {
    return (
      <PetCard
        key={pet.id}
        id={pet.id}
        name={pet.petName}
        photo={pet.petPhoto}
        tags={pet.tags}
        breed={pet.petBreed}
        location={pet.location}
        type={pet.petType}
        age={pet.petAge}
      />
    );
  }

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: false, 
    speed: 500, 
    slidesToShow: 2, 
    slidesToScroll: 1, 
    rows: 4, 

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 4,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 4,
          infinite: false,
          dots: true
        }
      },
    ]
  };

  return (
    <div className={styles.discoverPage}>
      <div className={styles.filterSection}>
        <h2 className={styles.sectionTitle}>Find your new best friend</h2>
        <p className={styles.sectionDesc}>
          Animals are reliable. Many full of love, true in their affections, predictable in their actions grateful and loyal!
        </p>
        <div className={styles.filterBtnsContainer}>
          <FilterButton
            key="Dog"
            id="Dogs"
            selected={filterBtn[0].selected}
            on={filterBtn[0].on}
            handleClick={() => selectFilterButton("Dog")}
            handleClickWhenSelected={() => unselectFilterButton()}
            image={Dog}
          />
          <FilterButton
            key="Cat"
            id="Cats"
            selected={filterBtn[1].selected}
            on={filterBtn[1].on}
            handleClick={() => selectFilterButton("Cat")}
            handleClickWhenSelected={() => unselectFilterButton()}
            image={Cat}
          />
          <FilterButton
            key="Other"
            id="Other animals"
            selected={filterBtn[2].selected}
            on={filterBtn[2].on}
            handleClick={() => selectFilterButton("Other")}
            handleClickWhenSelected={() => unselectFilterButton()}
            image={Other}
          />
        </div>
      </div>

      <div className={styles.cardsContainer}>
      <Slider {...sliderSettings}>
        {data.items.map((pet: PetProfile) => {
          if (filterBtn) {
            const filteredArray = createFilteredPetArray(filterBtn);

            if (filteredArray.includes(pet.petType)) {
              return petCardBuilder(pet);
            }

            // IF there are other animals in the animals array than cats and dogs
            // AND Cat AND Dog buttons are NOT selected, THEN show it.
            else if (
              filteredArray[2]?.includes(pet.petType) &&
              !filterBtn[0].selected &&
              !filterBtn[1].selected
            ) {
              return petCardBuilder(pet);
            }
          }
          return null;
        })}
        </Slider>
      </div>
    </div>
  );
}

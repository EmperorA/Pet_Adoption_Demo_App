# Pawfect Match
## Overview

### Vision
Pawfect Match strives to simplify the pet adoption process by allowing both pet lovers and shelters to easily navigate the necessary procedures in one single place.
Pawfect Match can be used by animal shelters to list the animals they have for adoption and follow up on any adoption application.
Pet lovers can easily browse the existing listings from the shelter and express their interest in adopting the pet of their dreams.
The scope for this application MVP (minimum viable product) is a single animal shelter listing their existing pets.
The scope can be extended in future MVP’s to multiple listings for multiple animal shelters.

### Mission
To them you are their world: finding a forever home for those without a collar

### Customer journey and designs
[Figma link](https://www.figma.com/design/qkbuZe9EbYyn9eeDydZIKz/Pawfect-Match---Chingu-Voyage-49'?node-id=0-1&t=1fU1F6fvHjGAkrUU-0)
 
### Requirements for the Animal Shelter Application MVP (Work in Progress)

#### User Roles
- **Shelter User Role**: Only one shelter role exists (admin).

##### Shelter User Capabilities
- **Login**: Shelter employees can login with the shelter role.
- **Create a Pet Listing**: 
  - **Mandatory Fields**:
    - Picture(s) of the animal
    - Name of the animal
    - Type of animal: dog, cat, turtle, rabbit
    - Age: in years
    - Description: text description about the animal
  - **Optional Fields**:
    - Breed: Balinese, Siamese, ragdoll, etc.
    - Location: city where the shelter or foster family is located
    - Multiple Tags:
      - neutered (if animal is neutered, else none)
      - outside (animal is allowed to go outside)
      - smallChildren (animal is used to small children)
      - otherAnimals (animal is used to other animals)
  - **Published**: boolean (default false)
- **Manage Listings**:
  - Save changes
  - Publish listing (makes it available for viewing)
  - Delete listing
  - Edit listing

#### Pet Lover User Capabilities
- **View Listings**: Pet lovers can visit the page and view all animals up for adoption.
- **Filter Search**:
  - Type of animal
  - Age ranges:
    - 0-1 year
    - 2-5 years
    - 5 years or more
- **View Animal Details**: See all details made available in the listing (name, description, etc).
- **Ask Questions via Chat**:
  - **Registration/Login Required**: Pet lovers must register (email & password) or login (email & password) to use chat.
  - **Chat Interaction**:
    - Send questions about a specific pet
    - Questions are received in the shelter user’s inbox
    - Shelter user can answer immediately or asynchronously
    - Answers are sent to the pet lover user’s inbox
- **Save to Favorites**: Logged-in users can save specific animals to a favorites list.
- **Express Interest in Adopting**: Pet lovers can express their interest in adopting a pet of their choice.

## Running the project 
### Live site
To be deployed...

### From the repo:
1. Clone this project locally
2. Run `npm install` in your bash/command line
3. Run `npm run dev` in your bash/command line

## Front-end Dependencies:
* axios (^1.7.2)
* bootstrap (^5.3.3)
* dotenv (^16.4.5)
* firebase (^10.12.1)
* prop-types (^15.8.1)
* react (^18.2.0)
* react-bootstrap (^2.10.2)
* react-dom (^18.2.0)
* react-router-dom (^6.23.1)
* uuid (^9.0.1)

## Front-end DevDependencies:
* @types/react (^18.3.3)
* @types/react-dom (^18.3.0)
* @types/uuid (^9.0.8)
* @typescript-eslint/eslint-plugin (^7.2.0)
* @typescript-eslint/parser (^7.2.0)
* @vitejs/plugin-react (^4.2.1)
* eslint (^8.57.0)
* eslint-plugin-react-hooks (^4.6.0)
* eslint-plugin-react-refresh (^0.4.6)
* typescript (^5.4.5)
* vite (^5.2.0)

## Back-end Dependencies:
* @prisma/client (^5.14.0)
* bcrypt (^5.1.1)
* cors (^2.8.5)
* dotenv (^16.4.5)
* express (^4.19.2)
* express-session (^1.18.0)
* helmet (^7.1.0)
* memorystore (^1.6.7)
* morgan (^1.10.0)
* passport (^0.7.0)
* passport-local (^1.0.0)
* pg (^8.11.5)

## Back-end DevDependencies:
* @types/node (^20.12.12)
* nodemon (^3.1.0)
* prisma (^5.14.0)
* ts-node (^10.9.2)
* typescript (^5.4.5)
   

## Backlog and Team Decision Log and consultable useful resources
* [BACKLOG](https://docs.google.com/document/d/1O9LEH8J2VEupbnVGXx2t0OlGF_ILeCfzrA4r-leEB3A/edit)
* [TEAM DECISION LOG](https://docs.google.com/document/d/1xzgP2-YeRcpab4oaQgNAHGEZwtkBKgMYUJHzyUrUQR4/edit): A list of helpful documents, tutorials and links that made the structure of this code rich and well organized:  

## Contributors
### UI/UX Designers: 
* Amina Hargitai
### Web Developers (and their repos): 
* [Carlos Morais](https://github.com/Morais-C)
* [Cristiano Valente](https://github.com/cris-valente)
* Andra Mertilos: [GitHub](https://github.com/andram11) / [LinkedIn](https://www.linkedin.com/in/andra-mertilos-49008055/)
* [Austine Uwumwonse](https://github.com/EmperorA)

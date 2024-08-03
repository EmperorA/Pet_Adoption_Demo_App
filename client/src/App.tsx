import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAuth } from './AuthContext';
import Landing from './components/Landing';
import {Route, Routes, Navigate } from 'react-router-dom';
import Discover from './components/Discover';
import CreateListing from './components/CreateListing'
import PetPage from './components/PetPage';


export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
  
      <Routes>
        <Route path="/" element={<Landing/> } />
        <Route path="/discover" element={<Discover />} /> 
        <Route path="/new-listing" element={<CreateListing />} />
        {user &&(
          <>
        
        <Route path="/petpage" element={<PetPage />} />
        </>
     ) }
     {!user && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>

    
  )
}



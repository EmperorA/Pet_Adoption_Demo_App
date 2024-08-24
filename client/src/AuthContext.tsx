import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import LoginModal from './components/user/LoginModal';
import RegisterModal from './components/user/RegisterModal';


interface Adopter {
    email: string;
    username: string;
    role: string;
    id: string;
}

interface Shelter extends Adopter {}

interface AuthContextProps {
  user: Adopter | null;
  admins: Shelter[];
  loading: boolean;
  login: (email: string, password: string,  onSuccess: (message: string) => void) => Promise<void>;
  register: (username: string, email: string, password: string, role: string, onSuccess: (message: string) => void) => Promise<void>;
  logout: () => Promise<void>;
  showLoginModal: () => void;
  showRegisterModal: () => void;
  hideLoginModal: () => void;
  hideRegisterModal: () => void;
  isLoginModalVisible: boolean;
  isRegisterModalVisible: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Adopter | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [admins, setAdmins] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
 

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://pawfectmatch-api.onrender.com/v1/auth/user', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setUser(data)
          localStorage.setItem('user', JSON.stringify(data));        
          } else {
            setUser(null);
            localStorage.removeItem('user');
          }       
      } catch (error) {
        setUser(null)
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await fetch('https://pawfectmatch-api.onrender.com/v1/user/search?role=shelter', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setAdmins(data);
        } else {
          setAdmins([]);
        }
      } catch (error) {
       
        setAdmins([]);
      }
    };

    fetchUser();
    fetchAdmins();
  }, []);

  const login = async (email: string, password: string, onSuccess: (message: string) => void) => {
    try {
      const response = await fetch('https://pawfectmatch-api.onrender.com/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const responseData = await response.json();
        onSuccess(responseData.message); 
        const user = {
          id: responseData.data.userId,
          username: responseData.data.username,
          email: responseData.data.email,
          role: responseData.data.role
        };
        // setUser(user); 
         localStorage.setItem('user', JSON.stringify(user));
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const register = async ( username:string, email: string, password: string, role: string, onSuccess: (message: string) => void) => {
    try {
      const response = await fetch('https://pawfectmatch-api.onrender.com/v1/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role })
      });

      if (response.ok) {
        const responseData = await response.json();
        onSuccess(responseData.message); 
       
      } else{
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const logout = async () => {
    try {
     
      const response = await fetch('https://pawfectmatch-api.onrender.com/v1/user/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
       setUser(null);     

      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const showLoginModal = () => setIsLoginModalVisible(true);
  const showRegisterModal = () => setIsRegisterModalVisible(true);
  const hideLoginModal = () => setIsLoginModalVisible(false);
  const hideRegisterModal = () => setIsRegisterModalVisible(false);

  return (
    <AuthContext.Provider value={{ 
      user, 
      admins, 
      loading, 
      login, 
      register, 
      logout, 
      showLoginModal,
      showRegisterModal,
      hideLoginModal,
      hideRegisterModal,
      isLoginModalVisible,
      isRegisterModalVisible }}>
      {children}
      <LoginModal show={isLoginModalVisible} handleClose={hideLoginModal} handleShowRegister={showRegisterModal} />
      <RegisterModal show={isRegisterModalVisible} handleClose={hideRegisterModal} handleShowLogin={showLoginModal} />
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

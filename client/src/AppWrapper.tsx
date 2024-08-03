
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import App from "./App";

function AppWrapper(){ 
  return (<AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>)
}

export default AppWrapper;

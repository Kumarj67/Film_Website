import Header from "./Components/Header";
import Cards from "./Components/Cards";
import AddMovie from "./Components/AddMovie";
import { Route, Routes } from "react-router-dom";
import Details from "./Components/Details";
import { createContext, useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
const AppState = createContext();
function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  return (
    <AppState.Provider value={{ login, username, setLogin, setUsername }}>
      <div className="App relative">
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/AddMovies" element={<AddMovie />} />
          <Route path="/Details/:id" element={<Details />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </AppState.Provider>
  );
}

export default App;
export { AppState };

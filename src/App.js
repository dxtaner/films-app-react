import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Components/Home/Home.js";
import Details from "./Components/Movies/Details.js";
import LoginForm from "./Components/Auth/LoginForm.js";
import Favorites from "./Components/Movies/Favorites.js";
import UpcomingMovies from "./Components/Movies/Upcoming.js";
import NavBar from "./Components/Header/Navbar/index.js";
import Footer from "./Components/Footer/Footer.js";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<UpcomingMovies />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

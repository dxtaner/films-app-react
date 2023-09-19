import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Components/Home/Home.js";
import About from "./Components/Home/About.js";
import MovieDetails from "./Components/Movies/Details.js";
import LoginForm from "./Components/Auth/LoginForm.js";
import Favorites from "./Components/Movies/FavoriteMovies.js";
import UpcomingMovies from "./Components/Movies/UpcomingMovies.js";
import NavBar from "./Components/Header/Navbar/index.js";
import Footer from "./Components/Footer/Footer.js";
import ActorDetails from "./Components/Actor/ActorDetails.js";
import PersonPopular from "./Components/Actor/PopularPerson.js";
import WatchListMovies from "./Components/Movies/WatchListMovies.js";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/upComingMovies" element={<UpcomingMovies />} />
        <Route path="/movieDetails/:id" element={<MovieDetails />} />
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchListMovies" element={<WatchListMovies />} />
        <Route path="/actorDetails/:id" element={<ActorDetails />} />
        <Route path="/popularPersons" element={<PersonPopular />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

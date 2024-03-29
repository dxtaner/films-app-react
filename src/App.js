import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Components/Home/Home.js";
import About from "./Components/Home/About.js";
import MovieDetails from "./Components/Movies/Details.js";
import LoginForm from "./Components/Auth/LoginForm.js";
import FavoriteMovies from "./Components/Movies/FavoriteMovies.js";
import UpcomingMovies from "./Components/Movies/UpcomingMovies.js";
import NavBar from "./Components/Header/Navbar/index.js";
import Footer from "./Components/Footer/Footer.js";
import ActorDetails from "./Components/Actor/ActorDetails.js";
import PersonPopular from "./Components/Actor/PopularPerson.js";
import WatchListMovies from "./Components/Movies/WatchListMovies.js";
import PopularSeries from "./Components/Series/PopularSeries.js";
import TopSeries from "./Components/Series/TopSeries.js";
import SearchMovies from "./Components/Movies/SearchMovie.js";
import DiscoverMovies from "./Components/Movies/DiscoverMovies.js";

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
        <Route path="/myFavoriteMovies" element={<FavoriteMovies />} />
        <Route path="/watchListMovies" element={<WatchListMovies />} />
        <Route path="/actorDetails/:id" element={<ActorDetails />} />
        <Route path="/popularPersons" element={<PersonPopular />} />
        <Route path="/popularSeries" element={<PopularSeries />} />
        <Route path="/topSeries" element={<TopSeries />} />
        <Route path="/searchMovies" element={<SearchMovies />} />
        <Route path="/discoverMovies" element={<DiscoverMovies />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

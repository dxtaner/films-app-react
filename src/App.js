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
import SearchBar from "./Components/Header/Navbar/SearchBar.js";
import NotFound from "./Components/NotFound/NotFound.js";
import SearchPerson from "./Components/Actor/Search/SearchPerson.js";

function App() {
  return (
    <Router>
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UpComingMovies" element={<UpcomingMovies />} />
        <Route path="/About" element={<About />} />
        <Route path="/Auth/Login" element={<LoginForm />} />

        <Route path="/MyFavoriteMovies" element={<FavoriteMovies />} />
        <Route path="/WatchListMovies" element={<WatchListMovies />} />

        <Route path="/PopularPersons" element={<PersonPopular />} />
        <Route path="/SearchPerson" element={<SearchPerson />} />
        <Route path="/MovieDetails/:id" element={<MovieDetails />} />
        <Route path="/ActorDetails/:id" element={<ActorDetails />} />

        <Route path="/PopularSeries" element={<PopularSeries />} />
        <Route path="/TopSeries" element={<TopSeries />} />
        <Route path="/SearchMovies" element={<SearchMovies />} />
        <Route path="/DiscoverMovies" element={<DiscoverMovies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

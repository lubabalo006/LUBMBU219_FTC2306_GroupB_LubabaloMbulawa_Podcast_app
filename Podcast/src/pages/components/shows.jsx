import React, { useState, useEffect, useRef } from 'react';
import FavoriteShows from "./favorites"
import "./styles/shows.css"
import "./styles/loader.css"


const MainShows = () => {
    const [shows, setShows] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);


    useEffect(() => {
        async function fullShowsPreview() {
          const response = await fetch("https://podcast-api.netlify.app/shows");
          const previews = await response.json();
    
          const fullShowsPromises = previews.map(async (preview) => {
            const fullShowResponse = await fetch(`https://podcast-api.netlify.app/id/${preview.id}`);
            return fullShowResponse.json();
          });
    
          const fullShows = await Promise.all(fullShowsPromises);
          setShows(fullShows.filter(show => show !== null));
          setLoading(false);
        }
        fullShowsPreview();
      }, []);


      // Function to sort shows based on title
  const sortedShows = shows.slice().sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (sortOrder === 'asc') {
      return titleA.localeCompare(titleB);
    } else {
      return titleB.localeCompare(titleA);
    }
  });


      // Function to handle sorting
        const handleSortChange = (e) => {
        setSortOrder(e.target.value);
      };


      // Function to add/remove a show from favorites
const toggleFavorite = (showId) => {
    const isFavorite = favorites.some((fav) => fav.id === showId);
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== showId);
      setFavorites(updatedFavorites);
    } else {
      const selectedShow = shows.find((show) => show.id === showId);
      if (selectedShow) {
        const updatedFavorites = [...favorites, selectedShow];
        setFavorites(updatedFavorites);
      }
    }
  };

    return(
        <div >


            <div>

            
            <div>
                <label htmlFor="sort">Sort by title: </label>
                <select id="sort" onChange={handleSortChange}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>


            <div className="card">
            <h3>Favorite Shows</h3>
            {favorites.map((favShow) => (
                <div className="card--info" key={favShow.id}>
                <img src={favShow.image} alt={favShow.title} className="card--image" />
                <p className="title">{favShow.title}</p>
                <div>
                    <h2>Seasons: {favShow.seasons.length}</h2>
                    <button onClick={() => toggleFavorite(show.id)}>
                    {favorites.some((fav) => fav.id === favShow.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                    <select onChange={(e) => setShowSeasons(prevState => ({ ...prevState, [show.id]: e.target.value }))}>
                    <option value="">Select a season</option>
                    {favShow.seasons.map((season, seasonIndex) => (
                        <option key={`${favShow.id}-${seasonIndex}`} value={seasonIndex}>
                        Season {seasonIndex + 1}
                        </option>
                    ))}
                    </select>
                </div>
                </div>
            ))}
            </div>

            </div>


            <h3>Show List</h3>

            <div>
            <label htmlFor="sort">Sort by title: </label>
            <select id="sort" onChange={handleSortChange}>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
            </div>

            <div className="card">
            {sortedShows.map((show) => (
                <div className="card--info" key={show.id}>
                <img src={show.image} alt={show.title} className="card--image" />
                <h2 className="title">{show.title}</h2>
                <div>
                     
                <h2>Seasons: {show.seasons.length}</h2>
                <button onClick={() => toggleFavorite(show.id)}>
                  {favorites.some((fav) => fav.id === show.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <select onChange={(e) => setShowSeasons(prevState => ({ ...prevState, [show.id]: e.target.value }))}>
                <option value="">Select a season</option>
                {show.seasons.map((season, seasonIndex) => (
                    <option key={`${show.id}-${seasonIndex}`} value={seasonIndex}>
                    Season {seasonIndex + 1}
                    </option>
                ))}
                </select>

                    

                    
                </div>
                </div>
            ))}
            </div>
        </div>



        
    )
}

export default MainShows
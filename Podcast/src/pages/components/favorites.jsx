import React, { useState, useEffect } from "react";
import "./styles/shows.css"
import MainShows from "./shows"
import { Link } from 'react-router-dom';

const FavoriteShows = () => {
    const [shows, setShows] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');

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


      const toggleFavorite = async (showId) => {
        const isFavorite = favorites.some((fav) => fav.id === showId);
    
        if (isFavorite) {
            // Remove from favorites in Supabase
            await supabase
                .from('favorite_shows')
                .delete()
                .eq('id', showId);
    
            const updatedFavorites = favorites.filter((fav) => fav.id !== showId);
            setFavorites(updatedFavorites);
        } else {
            // Add to favorites in Supabase
            const selectedShow = shows.find((show) => show.id === showId);
            if (selectedShow) {
                await supabase.from('favorite_shows').insert([selectedShow]);
                const updatedFavorites = [...favorites, selectedShow];
                setFavorites(updatedFavorites);
            }
        }
    };


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


      return (
        <div>
            <h3>Favorite Shows</h3>
            <div className="carousel">
                <div>
                    <label htmlFor="sort">Sort by title: </label>
                    <select id="sort" onChange={handleSortChange}>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>

                <div className="card">
                    {favorites.map((favShow) => (
                        <div className="card--info" key={favShow.id}>
                            <img src={favShow.image} alt={favShow.title} className="card--image" />
                            <p className="title">{favShow.title}</p>
                            <div>
                                <h2>Seasons: {favShow.seasons.length}</h2>
                                <button onClick={() => toggleFavorite(favShow.id)}>
                                    {favorites.some((fav) => fav.id === favShow.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                </button>
                                <select onChange={(e) => setShowSeasons(prevState => ({ ...prevState, [favShow.id]: e.target.value }))}>
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
        </div>
    );
}

export default FavoriteShows;
import React, { useState, useEffect, useRef } from 'react';
import FavoriteShows from "./favorites"
import "./styles/shows.css"
import "./styles/loader.css"
import Modal from "./modal";
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '/src/client';
import Fuse from 'fuse.js';

const MainShows = () => {
    const [shows, setShows] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [favorites, setFavorites] = useState([]);
  const [showSeasons, setShowSeasons] = useState(false);
  const audioRef = useRef(null);


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

      const toggleOverlay = ({ showId, seasonIndex, season }) => {
        const selectedShow = shows.find((show) => show.id === showId);
        const selectedSeason = selectedShow?.seasons[seasonIndex];
    
        setSelectedSeason({
          showId,
          seasonIndex,
          season: selectedSeason,
        });
    
        setShowModal(true);
      };

      const hideModal = () => {
        setShowModal(false);
        setSelectedSeason(null);
      };


      const play = (audioSrc, showId) => {
        // Pause any existing audio before playing new one
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
    
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play();
        playShow(showId);
      };

      const stop = () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };


      const playShow = (playedShowId) => {
        const playedShow = shows.find((show) => show.id === playedShowId);
        if (playedShow) {
          setRecentlyPlayed((prevRecentlyPlayed) => {
            const updatedRecentlyPlayed = [playedShow, ...prevRecentlyPlayed];
            return updatedRecentlyPlayed.slice(0, 10);
          });
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


    const filterShowsByGenre = (genre) => {
        // Filter the shows based on the selected genre
        const filteredShows = shows.filter((show) => show.genres.includes(genre));
        // Update the 'shows' state with the filtered results
        setShows(filteredShows);
      };
      
      const handleGenreClick = (genre) => {
        // Define an array of the selected genres
        const selectedGenres = [
          'Personal Growth',
          'True Crime and Investigative Journalism',
          'History',
          'Comedy',
          'Entertainment',
          'Business',
          'Fiction',
          'News',
          'Kids and Family'
          // Add other genres as needed
        ];
      
        // Check if the selected genre is within the array of valid genres
        if (selectedGenres.includes(genre)) {
          // Call the filter function with the selected genre
          filterShowsByGenre(genre);
        }
      };


    return(
        <div className="shows">

<div>
            <div>

            <div>
            <Link to="./favorites">Go to Favorites</Link>
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


            <div>
        <h3>Recently Played</h3>
        <div className="card">
            {recentlyPlayed.map((playedShow, index) => (
            <div className="card--info" key={index}>
                <img src={playedShow.image} alt={playedShow.title} className="card--image" />
                <p className="title">{playedShow.title}</p>
                {playedShow.seasons &&
                Array.isArray(playedShow.seasons) &&
                playedShow.seasons.map((season, seasonIndex) => (
                    <div key={`${playedShow.id}-${seasonIndex}`}>
                    <h4 onClick={() => toggleOverlay({ showId: playedShow.id, seasonIndex, season })}>
                        Season {seasonIndex + 1}
                    </h4>
                    </div>
                ))}
            </div>
            ))}
        </div>
      </div>

      <div className="genre-labels">
  
  <select onChange={(e) => handleGenreClick(e.target.value)}>
    <option value="">Select a genre</option>
    <option value="Action">Action</option>
    <option value="Drama">Drama</option>
    <option value="Personal Growth">Personal Growth</option>
    <option value="True Crime and Investigative Journalism">True Crime and Investigative Journalism</option>
    <option value="History">History</option>
    {/* Add other genre options */}
  </select>
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
                {/* Dropdown content */}
                {showSeasons[show.id] !== '' && (
                <div className="dropdown-content">
                    <h3 onClick={() => toggleOverlay({ showId: show.id, seasonIndex: showSeasons[show.id], season: show.seasons[showSeasons[show.id]] })}>
                    Season {parseInt(showSeasons[show.id]) + 1}
                    </h3>
                </div>
                )}

                
              </div>
            </div>
          ))}
        </div>
      </div>
    


{/* Modal for displaying episodes */}
{showModal && (
    <Modal open={showModal} onClose={() => setShowModal(false)} play={play}>
      {selectedSeason !== null && (
        <div className="modal">
          <h2>
            Season {selectedSeason.seasonIndex + 1} Episodes for {selectedSeason.showId}
          </h2>
          <ul>
            {selectedSeason.season?.episodes &&
              selectedSeason.season.episodes.map((episode, episodeIndex) => (
                <li key={episodeIndex}>
                  <p>Episode: {episodeIndex + 1}</p>
                  <p>Title: {episode.title}</p>
                  <p>Description: {episode.description}</p>
                  <button onClick={() => play(episode.file, selectedSeason.showId)}>Play</button>
                  <button onClick={stop}>Stop</button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </Modal>
  )}

            <div>
            <a id="scroll-up" className="scroll-up" href="#">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path fill="rgba(255,255,255,1)" d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z">
                    </path>
                </svg>
            </a>
            </div>

</div>
  )
}

export default MainShows
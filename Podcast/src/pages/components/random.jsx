import React, { useState, useRef, useEffect } from 'react';
import "./styles/carousel.css"
import Modal from "./modal";

const LandingPageCarousel = () => {
    const [shows, setShows] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);
    const [showSeasons, setShowSeasons] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
        async function fullShowsPreview() {
            try {
                const response = await fetch("https://podcast-api.netlify.app/shows");
                const previews = await response.json();

                const fullShowsPromises = previews.map(async (preview) => {
                    const fullShowResponse = await fetch(`https://podcast-api.netlify.app/id/${preview.id}`);
                    return fullShowResponse.json();
                });

                const fullShows = await Promise.all(fullShowsPromises);
                setShows(fullShows.filter(show => show !== null));
            } catch (error) {
                console.error("Error fetching shows:", error);
            }
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

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => {
            if (prevSlide >= shows.length - 1) {
                return 0;
            } else {
                return prevSlide + 1;
            }
        });
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => {
            if (prevSlide === 0) {
                return shows.length - 1;
            } else {
                return prevSlide - 1;
            }
        });
    };


    const slideWidth = `${100 / shows.length}%`;
    const slideStyle = {
        transform: `translateX(-${currentSlide * 100}%)`,
        width: slideWidth,
    };

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper" ref={slideRef} style={slideStyle}>
                {shows.map((show, index) => (
                    <div className="card--info" key={index}>
                        {/* Display show information */}
                        <img src={show.image} alt={show.title} />
                        <h2 className="title">{show.title}</h2>
                        <div>
                            <h2>Seasons: {show.seasons.length}</h2>
                            <button onClick={() => toggleFavorite(show.id)}>
                                {/* Implement logic to show 'Add/Remove from Favorites' */}
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

                {/* Modal for displaying episodes */}
                {showModal && (
                    <Modal open={showModal} onClose={() => setShowModal(false)} play={play}>
                    {selectedSeason !== null && (
                        <div>
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

            <button className="carousel-btn prev" onClick={prevSlide}>
                Prev
            </button>
            <button className="carousel-btn next" onClick={nextSlide}>
                Next
            </button>
        </div>
    );
};

export default LandingPageCarousel;

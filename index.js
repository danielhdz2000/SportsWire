document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "69f070f33955e7da0389b89068331b13"; // Replace with your actual API key
    const TODAY = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

    // API endpoints for each sport
    const ENDPOINTS = {
        nba: `https://v1.basketball.api-sports.io/games?date=${TODAY}`,
        futbol: `https://v3.football.api-sports.io/fixtures?date=${TODAY}`, // Using the same API from football.js
        nfl: `https://v1.american-football.api-sports.io/games?date=${TODAY}`,
        mlb: `https://v1.baseball.api-sports.io/games?date=${TODAY}`,
    };

    // Fetch and display games for a specific sport
    const fetchGames = async (sport, containerId) => {
        try {
            const response = await fetch(ENDPOINTS[sport], {
                method: "GET",
                headers: {
                    "x-apisports-key": API_KEY,
                },
            });

            if (!response.ok) throw new Error(`Failed to fetch ${sport} games: ${response.statusText}`);
            const data = await response.json();
            console.log(`${sport} API Response:`, data); // Log API response for debugging
            displayGames(data.response.slice(0, 3), containerId); // Display top 3 games
        } catch (error) {
            console.error(`Error fetching ${sport} games:`, error);
            document.getElementById(containerId).innerHTML = `<p>Failed to load ${sport} games.</p>`;
        }
    };

    // Display games in the respective container
    const displayGames = (games, containerId) => {
        const container = document.getElementById(containerId);
        container.innerHTML = ""; // Clear previous content

        if (!games || games.length === 0) {
            container.innerHTML = "<p>No games available.</p>";
            return;
        }

        games.forEach((game) => {
            let homeTeam, awayTeam, homeScore, awayScore, gameDate, gameStatus;

            // Handle Futbol API response structure
            if (containerId === "futbol-container") {
                homeTeam = game.teams?.home?.name || "Home Team";
                awayTeam = game.teams?.away?.name || "Away Team";
                homeScore = game.goals?.home !== null ? game.goals.home : "N/A";
                awayScore = game.goals?.away !== null ? game.goals.away : "N/A";
                gameDate = new Date(game.fixture?.date).toLocaleString();
                gameStatus = game.fixture?.status?.long || "Scheduled";
            } else {
                // General structure for other sports
                homeTeam = game.teams?.home?.name || "Unknown Team";
                awayTeam = game.teams?.away?.name || "Unknown Team";
                homeScore = game.scores?.home?.total ?? "N/A";
                awayScore = game.scores?.away?.total ?? "N/A";
                gameDate = new Date(game.date).toLocaleString();
                gameStatus = game.status?.long || "Scheduled";
            }

            const gameItem = document.createElement("div");
            gameItem.classList.add("score-item");
            gameItem.innerHTML = `
                <h3>${homeTeam} vs ${awayTeam}</h3>
                <p>Date: ${gameDate}</p>
                <p>Status: ${gameStatus}</p>
                <p>Score: ${homeScore} - ${awayScore}</p>
            `;
            container.appendChild(gameItem);
        });
    };

    // Fetch games for each sport
    fetchGames("nba", "nba-container");
    fetchGames("futbol", "futbol-container");
    fetchGames("nfl", "nfl-container");
    fetchGames("mlb", "mlb-container");
});

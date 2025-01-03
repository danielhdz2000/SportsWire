document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "69f070f33955e7da0389b89068331b13"; // Replace with your actual API key
    const playerSearchForm = document.getElementById("player-search-form");
    const playerNameInput = document.getElementById("player-name");
    const playerStatsContainer = document.getElementById("player-stats-container");

    // Function to fetch player information
    const fetchPlayerInfo = async (name) => {
        try {
            const response = await fetch(`https://v2.nba.api-sports.io/players?search=${name}`, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "v2.nba.api-sports.io",
                    "x-rapidapi-key": API_KEY,
                },
            });

            const data = await response.json();
            if (data.results > 0) {
                const player = data.response[0]; // Use the first matching player
                fetchPlayerStats(player.id, player);
            } else {
                playerStatsContainer.innerHTML = `<p>No player found with the name "${name}".</p>`;
            }
        } catch (error) {
            console.error("Error fetching player information:", error);
            playerStatsContainer.innerHTML = `<p>Error fetching player information.</p>`;
        }
    };

    // Function to fetch player statistics
    const fetchPlayerStats = async (playerId, player) => {
        try {
            const response = await fetch(`https://v2.nba.api-sports.io/players/statistics?season=2020&id=${playerId}`, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "v2.nba.api-sports.io",
                    "x-rapidapi-key": API_KEY,
                },
            });

            const data = await response.json();
            if (data.results > 0) {
                const stats = data.response[0];
                displayPlayerStats(stats, player);
            } else {
                playerStatsContainer.innerHTML = `<p>No statistics available for this player.</p>`;
            }
        } catch (error) {
            console.error("Error fetching player statistics:", error);
            playerStatsContainer.innerHTML = `<p>Error fetching player statistics.</p>`;
        }
    };

    // Function to display player statistics
    const displayPlayerStats = (stats, player) => {
        playerStatsContainer.innerHTML = `
            <h3>${player.firstname} ${player.lastname}</h3>
            <p>Team: ${stats.team.name}</p>
            <p>Points: ${stats.points}</p>
            <p>Rebounds: ${stats.totReb}</p>
            <p>Assists: ${stats.assists}</p>
            <p>Steals: ${stats.steals}</p>
            <p>Turnovers: ${stats.turnovers}</p>
        `;
    };

    // Event Listener for Player Search Form
    playerSearchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            fetchPlayerInfo(playerName);
        } else {
            playerStatsContainer.innerHTML = `<p>Please enter a player name.</p>`;
        }
    });
});

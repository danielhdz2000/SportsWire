document.addEventListener("DOMContentLoaded", () => {
    const API_URL = 'https://v1.basketball.api-sports.io/games'; // NBA API endpoint
    const API_KEY = '69f070f33955e7da0389b89068331b13'; // Replace with your actual API key
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    const fetchGames = async () => {
        try {
            const response = await fetch(`${API_URL}?date=${today}`, {
                method: 'GET',
                headers: {
                    'x-apisports-key': API_KEY
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("NBA API Response:", data); // Log the response for debugging
            displayGames(data.response);
        } catch (error) {
            console.error("Error fetching NBA games data:", error);
            document.getElementById('scores-container').innerHTML = `<p>Failed to load game data.</p>`;
        }
    };

    const displayGames = (games) => {
        const container = document.getElementById('scores-container');
        container.innerHTML = ''; // Clear any existing content
        if (!games || games.length === 0) {
            container.innerHTML = '<p>No NBA games scheduled for today.</p>';
            return;
        }
        games.forEach(game => {
            const homeTeam = game.teams.home?.name || "Unknown Team";
            const awayTeam = game.teams.away?.name || "Unknown Team";
            const homeScore = game.scores.home?.total ?? "N/A";
            const awayScore = game.scores.away?.total ?? "N/A";
            const gameDate = new Date(game.date).toLocaleString();
            const gameStatus = game.status?.long || "Scheduled";

            const gameItem = document.createElement('div');
            gameItem.classList.add('score-item');
            gameItem.innerHTML = `
                <h3>${homeTeam} vs ${awayTeam}</h3>
                <p>Date: ${gameDate}</p>
                <p>Status: ${gameStatus}</p>
                <p>Score: ${homeScore} - ${awayScore}</p>
            `;
            container.appendChild(gameItem);
        });
    };

    // Fetch NBA games data on page load
    fetchGames();
});
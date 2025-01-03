document.addEventListener("DOMContentLoaded", () => {
    const API_URL = 'https://v1.american-football.api-sports.io/games'; // NFL API endpoint
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
            console.log("NFL API Response:", data); // Log the response for debugging
            displayGames(data.response);
        } catch (error) {
            console.error("Error fetching NFL games data:", error);
            document.getElementById('scores-container').innerHTML = `<p>Failed to load game data.</p>`;
        }
    };

    const displayGames = (games) => {
        const container = document.getElementById('scores-container');
        container.innerHTML = ''; // Clear any existing content
        if (!games || games.length === 0) {
            container.innerHTML = '<p>No NFL games scheduled for today.</p>';
            return;
        }
        games.forEach(game => {
            const homeTeam = game.teams.home?.name || "Unknown Team";
            const awayTeam = game.teams.away?.name || "Unknown Team";
            const homeScore = game.scores.home?.total ?? "N/A";
            const awayScore = game.scores.away?.total ?? "N/A";

            // Parse the game date
            let gameDate;
            try {
                gameDate = new Date(game.date).toLocaleString(); // Attempt to format the date
            } catch {
                gameDate = "Unknown Date"; // Fallback if parsing fails
            }

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

    // Fetch NFL games data on page load
    fetchGames();
});

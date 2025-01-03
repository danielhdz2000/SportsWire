document.addEventListener("DOMContentLoaded", () => {
    const API_URL = 'https://v1.baseball.api-sports.io/games';
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
            displayGames(data.response);
        } catch (error) {
            console.error("Error fetching games data:", error);
            document.getElementById('scores-container').innerHTML = `<p>Failed to load game data.</p>`;
        }
    };

    const displayGames = (games) => {
        const container = document.getElementById('scores-container');
        container.innerHTML = ''; // Clear any existing content
        if (games.length === 0) {
            container.innerHTML = '<p>No games scheduled for today.</p>';
            return;
        }
        games.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.classList.add('score-item');
            gameItem.innerHTML = `
                <h3>${game.teams.home.name} vs ${game.teams.away.name}</h3>
                <p>Date: ${new Date(game.date).toLocaleString()}</p>
                <p>Status: ${game.status.long}</p>
                <p>Score: ${game.scores.home.total} - ${game.scores.away.total}</p>
            `;
            container.appendChild(gameItem);
        });
    };

    // Fetch games data on page load
    fetchGames();
});

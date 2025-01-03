document.addEventListener("DOMContentLoaded", () => {
    const API_URL = 'https://v3.football.api-sports.io/fixtures';
    const API_KEY = '69f070f33955e7da0389b89068331b13'; // Replace with your actual API key
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    const fetchMatches = async () => {
        try {
            const response = await fetch(`${API_URL}?date=${today}`, {
                headers: {
                    'x-apisports-key': API_KEY
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Football API Response:", data); // Log the response for debugging
            displayMatches(data.response);
        } catch (error) {
            console.error("Error fetching football matches:", error);
            document.getElementById('scores-container').innerHTML = `<p>Failed to load football matches.</p>`;
        }
    };

    const displayMatches = (matches) => {
        const container = document.getElementById('scores-container');
        container.innerHTML = ''; // Clear existing content
        if (!matches || matches.length === 0) {
            container.innerHTML = '<p>No matches scheduled for today.</p>';
            return;
        }
        matches.forEach(match => {
            const homeTeam = match.teams.home.name || "Home Team";
            const awayTeam = match.teams.away.name || "Away Team";
            const homeScore = match.goals.home !== null ? match.goals.home : "N/A";
            const awayScore = match.goals.away !== null ? match.goals.away : "N/A";
            const matchDate = new Date(match.fixture.date).toLocaleString();
            const matchStatus = match.fixture.status.long || "Scheduled";

            const scoreItem = document.createElement('div');
            scoreItem.classList.add('score-item');

            scoreItem.innerHTML = `
                <h3>${homeTeam} vs ${awayTeam}</h3>
                <p>Date: ${matchDate}</p>
                <p>Status: ${matchStatus}</p>
                <p>Score: ${homeScore} - ${awayScore}</p>
            `;
            container.appendChild(scoreItem);
        });
    };

    // Fetch today's matches on page load
    fetchMatches();
});

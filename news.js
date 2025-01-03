document.addEventListener("DOMContentLoaded", () => {
    const RSS_URL = 'https://www.espn.com/espn/rss/news'; // Replace with your RSS feed URL
    const isIndexPage = document.body.classList.contains('index-page'); // Check if this is the index page
    const newsContainer = document.querySelector('.news-grid');

    const fetchNews = async () => {
        try {
            const response = await fetch(RSS_URL);
            const rssText = await response.text();

            // Parse the RSS feed
            const parser = new DOMParser();
            const xmlData = parser.parseFromString(rssText, "application/xml");
            const items = xmlData.querySelectorAll("item");

            // Display all or limited news articles
            const maxArticles = isIndexPage ? 4 : items.length;
            const newsItems = Array.from(items).slice(0, maxArticles);

            displayNews(newsItems);
        } catch (error) {
            console.error("Error fetching news:", error);
            newsContainer.innerHTML = `<p>Failed to load news.</p>`;
        }
    };

    const displayNews = (newsItems) => {
        newsContainer.innerHTML = ''; // Clear existing content

        newsItems.forEach(item => {
            const title = item.querySelector("title").textContent;
            const link = item.querySelector("link").textContent;
            const description = item.querySelector("description").textContent;

            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');
            newsItem.innerHTML = `
                <a href="${link}" target="_blank">
                    <h3>${title}</h3>
                </a>
                <p>${description}</p>
            `;

            newsContainer.appendChild(newsItem);
        });
    };

    // Fetch and display news articles on page load
    fetchNews();
});

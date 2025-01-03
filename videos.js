document.addEventListener("DOMContentLoaded", () => {
    const RSS_URL = 'https://cors-anywhere.herokuapp.com/https://www.youtube.com/feeds/videos.xml?channel_id=UC_x5XG1OV2P6uZZ5FSM9Ttw';


    const videoContainer = document.querySelector('.video-grid');

    const fetchVideos = async () => {
        try {
            const response = await fetch(RSS_URL);
            console.log("Fetch Response:", response);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const rssText = await response.text();
            console.log("RSS Feed Data:", rssText);

            const parser = new DOMParser();
            const xmlData = parser.parseFromString(rssText, "application/xml");
            const items = xmlData.querySelectorAll("entry");

            if (items.length === 0) {
                throw new Error("No video entries found in the RSS feed.");
            }

            displayVideos(items);
        } catch (error) {
            console.error("Error fetching videos:", error);
            videoContainer.innerHTML = `<p>Failed to load videos. ${error.message}</p>`;
        }
    };

    const displayVideos = (items) => {
        videoContainer.innerHTML = ''; // Clear existing content

        const topVideos = Array.from(items).slice(0, 5); // Limit to top 5 videos
        topVideos.forEach(item => {
            const title = item.querySelector("title").textContent;
            const videoId = item.querySelector("yt\\:videoId").textContent;

            const videoItem = document.createElement('div');
            videoItem.classList.add('video-item');
            videoItem.innerHTML = `
                <iframe
                    src="https://www.youtube.com/embed/${videoId}"
                    allowfullscreen>
                </iframe>
                <h3>${title}</h3>
            `;
            videoContainer.appendChild(videoItem);
        });
    };

    fetchVideos();
});

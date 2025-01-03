document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.getElementById("post-form");
    const postsContainer = document.getElementById("posts-container");
    
        // Forbidden Words List
        const forbiddenWords = ["badword1", "badword2", "offensiveword"];
    
        // Function to Check for Forbidden Words
        function containsForbiddenWords(content) {
            return forbiddenWords.some((word) =>
                content.toLowerCase().includes(word)
            );
        }
    
        // Create a new post
        postForm.addEventListener("submit", (e) => {
            e.preventDefault();
    
            const userName = document.getElementById("user-name").value.trim();
            const content = document.getElementById("post-content").value.trim();
            const category = document.getElementById("post-category").value;
    
            if (!userName || !content || !category) {
                alert("All fields are required!");
                return;
            }
    
            // Check for forbidden words
            if (containsForbiddenWords(content)) {
                alert(
                    "Your post contains inappropriate content and cannot be posted. Please revise it."
                );
                return;
            }
    
            // Create post element
            const postElement = document.createElement("div");
            postElement.classList.add("post");
    
            postElement.innerHTML = `
                <div class="user-profile">
                    <div class="user-avatar"></div>
                    <span class="user-name">${userName}</span>
                    <span class="category-badge">${category}</span>
                </div>
                <p>${content}</p>
                <div class="post-actions">
                    <button class="like-btn">Like</button>
                    <button class="reply-btn">Reply</button>
                    <button class="report-btn">Report</button>
                </div>
                <div class="replies"></div>
            `;
    
            postsContainer.prepend(postElement);
            postForm.reset();
    
            // Add event listeners for Like, Reply, and Report
            setupPostActions(postElement);
        });
    
        // Setup Like, Reply, and Report functionality
        function setupPostActions(post) {
            const likeButton = post.querySelector(".like-btn");
            const replyButton = post.querySelector(".reply-btn");
            const reportButton = post.querySelector(".report-btn");
            const repliesContainer = post.querySelector(".replies");
    
            likeButton.addEventListener("click", () => {
                const likes = likeButton.dataset.likes ? parseInt(likeButton.dataset.likes) : 0;
                likeButton.dataset.likes = likes + 1;
                likeButton.textContent = `Like (${likes + 1})`;
            });
    
            replyButton.addEventListener("click", () => {
                const reply = prompt("Write your reply:");
                if (reply) {
                    const replyElement = document.createElement("div");
                    replyElement.classList.add("reply");
                    replyElement.textContent = reply;
                    repliesContainer.appendChild(replyElement);
                }
            });
    
            reportButton.addEventListener("click", () => {
                reportPost(post);
            });
        }
    
        // Report Post Functionality
        function reportPost(post) {
            const reportReason = prompt(
                "Why are you reporting this post? (e.g., offensive content, spam)"
            );
    
            if (reportReason) {
                const reportedContent = post.querySelector("p").textContent;
    
                // Log report (this would ideally send to a backend server)
                console.log("Reported Post:", reportedContent);
                console.log("Reason:", reportReason);
    
                alert("Thank you for reporting this post. A moderator will review it.");
            }
        }
    });
    
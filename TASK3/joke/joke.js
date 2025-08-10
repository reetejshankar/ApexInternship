const jokeText = document.getElementById("joke");
const emojis = document.querySelectorAll(".emoji");

// Fetch a random joke from API
async function fetchJoke() {
    jokeText.textContent = "Loading joke...";
    try {
        const res = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await res.json();
        jokeText.textContent = `${data.setup} 🤔 ${data.punchline}`;
    } catch (error) {
        jokeText.textContent = "Failed to load joke 😢";
    }
}

// Add click event to emojis
emojis.forEach(emoji => {
    emoji.addEventListener("click", () => {
        fetchJoke(); // Load new joke after reaction
    });
});

// Load first joke on page load
fetchJoke();

console.log("Fetching songs...");

async function getSongs() {
    try {
        let response = await fetch("http://127.0.0.1:3000/songs/");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let html = await response.text();

        // Create a temporary div to parse the HTML
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        let songs = [];
        // Loop through all <a> tags in the parsed HTML
        let links = tempDiv.getElementsByTagName("a");
        for (let i = 0; i < links.length; i++) {
            let href = links[i].getAttribute("href");
            // Check if the link ends with .mp3 and add it to songs array
            if (href.endsWith(".mp3")) {
                songs.push(href);
            }
        }
        return songs;
    } catch (error) {
        console.error('Error fetching songs:', error);
        return []; // Return an empty array if there's an error
    }
}

async function playSong(url) {
    try {
        let audio = new Audio(url);
        await audio.play();
        console.log(`Now playing: ${url}`);
    } catch (error) {
        console.error('Error playing song:', error);
    }
}

async function playSongs() {
    try {
        let songs = await getSongs();
        console.log("Fetched songs:", songs);

        if (songs.length > 0) {
            // Play each song one by one with user interaction
            for (let i = 0; i < songs.length; i++) {
                await playSong(songs[i]);
            }
            console.log("All songs played.");
        } else {
            console.log("No songs found.");
        }
    } catch (error) {
        console.error('Error playing songs:', error);
    }
}

// Event listener for a user interaction (e.g., button click)
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    playButton.addEventListener('click', function() {
        playSongs();
    });
});

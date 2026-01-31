let autoScrollInterval = null;

async function loadTeamData() {

    const response = await fetch("../assets/data/team.json");
    const teamData = await response.json();

    const track = document.getElementById("teamTrack");
    if (!track) return;

    track.innerHTML = "";

    teamData.forEach(member => {

        const card = document.createElement("div");
        card.className = "team-card";

        card.innerHTML = `
            <div class="team-photo" style="background-image: url('${member.image}')"></div>
            <h5>${member.fullname}</h5>
            <span class="team-role">${member.designation || ""}</span>
            <p class="team-domain">${member.role || ""}</p>
        `;

        track.appendChild(card);
    });

    setupSliderBehavior();
}


function setupSliderBehavior() {

    const track = document.getElementById("teamTrack");
    const prevBtn = document.querySelector(".team-prev");
    const nextBtn = document.querySelector(".team-next");

    if (!track) return;

    const isOverflowing = track.scrollWidth > track.clientWidth;

    // 👉 If NOT overflowing
    if (!isOverflowing) {

        prevBtn.style.display = "none";
        nextBtn.style.display = "none";

        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }

        return;
    }

    // 👉 If overflowing
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";

    const card = track.querySelector(".team-card");
    const gap = 24;
    const cardWidth = card.offsetWidth + gap;

    nextBtn.onclick = () => {
        track.scrollBy({ left: cardWidth, behavior: "smooth" });
    };

    prevBtn.onclick = () => {
        track.scrollBy({ left: -cardWidth, behavior: "smooth" });
    };

    if (autoScrollInterval) clearInterval(autoScrollInterval);

    autoScrollInterval = setInterval(() => {

        const maxScroll = track.scrollWidth - track.clientWidth;

        if (track.scrollLeft >= maxScroll - 5) {
            track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            track.scrollBy({ left: cardWidth, behavior: "smooth" });
        }

    }, 3500);
}


// Load on page start
document.addEventListener("DOMContentLoaded", loadTeamData);

// Recheck on window resize
window.addEventListener("resize", setupSliderBehavior);

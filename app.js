const PASSWORD = "280525";

const albums = [
  {
    id: "beginning",
    name: "The Beginning",
    avatar: "1",
    title: "First Love",
    description:
      "The episode where everything changed: one message, one smile, and the first time I told you I love you.",
    heroVideo: "media/beginning/hero.mp4",
    audio: { src: "media/audio/asafi.mp3", start: 15, end: 0 },
    rows: [
      {
        title: "Season 1: How My Heart Chose You",
        items: [
          {
            type: "image",
            src: "media/beginning/photo-01.jpg",
            title: "The Day Everything Started",
            message:
              "On June 20, I said I love you for the first time. One year later, those words still feel too small for what you mean to me.",
          },
          {
            type: "image",
            src: "media/beginning/photo-02.jpg",
            title: "Your Smile",
            message:
              "I keep this memory like a favorite scene. Your smile makes ordinary days feel like something written just for us.",
          },
          {
            type: "video",
            src: "media/beginning/video-01.mp4",
            title: "Our Little Trailer",
            message:
              "If our love had a trailer, it would be full of laughs, soft looks, and all the tiny moments I never want to forget.",
          },
        ],
      },
    ],
  },
  {
    id: "adventures",
    name: "Adventures",
    avatar: "2",
    title: "Us Outside",
    description:
      "Every walk, every date, every silly plan. The world looks better when I see it with you.",
    heroVideo: "media/adventures/hero.mp4",
    audio: { src: "media/audio/perfect.mp3", start: 0, end: 0 },
    rows: [
      {
        title: "Season 2: Places With You",
        items: [
          {
            type: "image",
            src: "media/adventures/photo-01.jpg",
            title: "Wherever We Go",
            message: "The place matters less than the fact that your hand is near mine.",
          },
          {
            type: "image",
            src: "media/adventures/photo-02.jpg",
            title: "Main Character Energy",
            message:
              "You make every little outing feel like the best episode of the season.",
          },
          {
            type: "video",
            src: "media/adventures/video-01.mp4",
            title: "The Scene I Replay",
            message:
              "I replay these seconds because they remind me how lucky I am to love you.",
          },
          {
            type: "image",
            src: "media/adventures/photo-04.jpg",
            title: "Your Laugh",
            message: "Your laugh is the kind of sound that fixes my whole day.",
          },
          {
            type: "image",
            src: "media/adventures/photo-05.jpg",
            title: "Next To You",
            message:
              "Next to you, I never feel like I am just passing time. I feel like I am living it.",
          },
        ],
      },
    ],
  },
  {
    id: "forever",
    name: "Forever",
    avatar: "3",
    title: "Forever Us",
    description:
      "A collection for the future: more photos, more stories, more years of choosing each other.",
    heroVideo: "media/forever/hero.mp4",
    audio: { src: "media/audio/him-and-i.mp3", start: 0, end: 0 },
    rows: [
      {
        title: "Season 3: The Promise",
        items: [
          {
            type: "image",
            src: "media/forever/photo-01.jpg",
            title: "Still You",
            message:
              "After one year, I do not love you less quietly. I love you more clearly.",
          },
          {
            type: "video",
            src: "media/forever/video-01.mp4",
            title: "My Home Feeling",
            message:
              "You are not just someone I love. You are the feeling I want to come back to.",
          },
          {
            type: "video",
            src: "media/forever/video-02.mp4",
            title: "To Many More",
            message:
              "This is only the first anniversary of the first I love you. I want so many more with you.",
          },
          {
            type: "video",
            src: "media/forever/video-03.mp4",
            title: "I Choose You",
            message: "In every version of the story, I would still choose you.",
          },
        ],
      },
    ],
  },
];

const state = {
  albumIndex: 0,
  itemIndex: 0,
  flatItems: [],
  audioEnd: 0,
};

const $ = (selector) => document.querySelector(selector);

const passwordScreen = $("#passwordScreen");
const passwordForm = $("#passwordForm");
const passwordInput = $("#passwordInput");
const passwordError = $("#passwordError");
const profileScreen = $("#profileScreen");
const homeScreen = $("#homeScreen");
const profiles = $("#profiles");
const rows = $("#rows");
const albumTitle = $("#albumTitle");
const albumDescription = $("#albumDescription");
const heroVideo = $("#heroVideo");
const heroFallback = $("#heroFallback");
const backgroundAudio = $("#backgroundAudio");
const viewer = $("#viewer");
const viewerImage = $("#viewerImage");
const viewerVideo = $("#viewerVideo");
const viewerCount = $("#viewerCount");
const viewerTitle = $("#viewerTitle");
const viewerMessage = $("#viewerMessage");

function mediaSrc(src) {
  return window.embeddedMedia?.[src] || src;
}

function setMedia(element, src) {
  if (!element) return;
  element.src = mediaSrc(src);
  if (element.load) element.load();
}

function handleMediaError(event) {
  const target = event.target;
  if (!(target instanceof HTMLImageElement || target instanceof HTMLVideoElement)) return;

  const card = target.closest(".media-card");
  if (!card) return;
  target.style.display = "none";
  const fallback = card.querySelector(".fallback");
  if (fallback) fallback.style.display = "block";
}

function attachAutoPoster(video) {
  if (!video || video.dataset.posterReady === "true") return;
  video.dataset.posterReady = "true";

  const capture = () => {
    if (!video.videoWidth || !video.videoHeight) return;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      video.poster = canvas.toDataURL("image/jpeg", 0.82);
    } catch {
      // Some browsers block canvas capture for specific media sources.
    }
  };

  video.addEventListener("loadeddata", capture, { once: true });
  video.addEventListener(
    "loadedmetadata",
    () => {
      const targetTime = Number.isFinite(video.duration)
        ? Math.min(0.35, Math.max(0, video.duration - 0.1))
        : 0;
      video.addEventListener("seeked", capture, { once: true });
      try {
        video.currentTime = targetTime;
      } catch {
        capture();
      }
    },
    { once: true },
  );
}

function renderProfiles() {
  profiles.innerHTML = albums
    .map(
      (album, index) => `
        <button class="profile" type="button" data-profile="${index}">
          <span class="avatar" aria-hidden="true"><span>${album.avatar}</span></span>
          <span class="profile-name">${album.name}</span>
        </button>
      `,
    )
    .join("");
}

function placeholder(item) {
  return `
    <span class="placeholder-tile">
      <strong>${item.title}</strong>
      <small>Add your ${item.type === "video" ? "video" : "photo"} here</small>
    </span>
  `;
}

function mediaCard(item, index) {
  const media =
    item.type === "video"
      ? `<video muted playsinline preload="auto" data-src="${item.src}"></video>`
      : `<img data-src="${item.src}" alt="${item.title}" loading="lazy" />`;

  return `
    <div class="media-tile">
      <button class="media-card" type="button" data-item="${index}">
        <span class="media-badge">N</span>
        ${media}
        <span class="fallback">${placeholder(item)}</span>
      </button>
      <p>tap to read message</p>
    </div>
  `;
}

function hydrateMedia(root = document) {
  root.querySelectorAll("[data-src]").forEach((element) => {
    if (element instanceof HTMLVideoElement) attachAutoPoster(element);
    setMedia(element, element.dataset.src);
  });
}

function startAudio(album) {
  if (!backgroundAudio) return;
  backgroundAudio.pause();
  backgroundAudio.removeAttribute("src");
  state.audioEnd = Number(album.audio.end) || 0;
  setMedia(backgroundAudio, album.audio.src);
  backgroundAudio.loop = !state.audioEnd;
  backgroundAudio.volume = 0.48;
  backgroundAudio.currentTime = Number(album.audio.start) || 0;
  backgroundAudio.play().catch(() => {});
}

function showAlbum(index) {
  state.albumIndex = index;
  const album = albums[index];
  state.flatItems = album.rows.flatMap((row) => row.items);

  albumTitle.textContent = album.title;
  albumDescription.textContent = album.description;
  heroFallback.style.display = "block";
  heroVideo.pause();
  heroVideo.removeAttribute("src");
  setMedia(heroVideo, album.heroVideo);

  rows.innerHTML = album.rows
    .map(
      (row) => `
        <section class="row">
          <h3>${row.title}</h3>
          <div class="media-row">
            ${row.items.map((item) => mediaCard(item, state.flatItems.indexOf(item))).join("")}
          </div>
        </section>
      `,
    )
    .join("");

  profileScreen.classList.add("is-hidden");
  homeScreen.classList.remove("is-hidden");
  hydrateMedia(rows);
  startAudio(album);
}

function openViewer(index) {
  const item = state.flatItems[index];
  state.itemIndex = index;
  const isVideo = item.type === "video";

  viewerImage.classList.toggle("is-hidden", isVideo);
  viewerVideo.classList.toggle("is-hidden", !isVideo);
  viewerVideo.pause();
  viewerVideo.removeAttribute("src");

  if (isVideo) {
    attachAutoPoster(viewerVideo);
    setMedia(viewerVideo, item.src);
  } else {
    setMedia(viewerImage, item.src);
    viewerImage.alt = item.title;
  }

  viewerCount.textContent = `Episode ${index + 1} of ${state.flatItems.length}`;
  viewerTitle.textContent = item.title;
  viewerMessage.textContent = item.message;
  viewer.classList.remove("is-hidden");
}

function closeViewer() {
  viewer.classList.add("is-hidden");
  viewerVideo.pause();
}

function moveViewer(direction) {
  const next =
    (state.itemIndex + direction + state.flatItems.length) % state.flatItems.length;
  openViewer(next);
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (passwordInput.value.trim() !== PASSWORD) {
    passwordError.classList.remove("is-hidden");
    return;
  }

  passwordScreen.classList.add("is-hidden");
  profileScreen.classList.remove("is-hidden");
});

profiles.addEventListener("click", (event) => {
  const button = event.target.closest("[data-profile]");
  if (button) showAlbum(Number(button.dataset.profile));
});

rows.addEventListener("click", (event) => {
  const button = event.target.closest("[data-item]");
  if (button) openViewer(Number(button.dataset.item));
});

$("#backProfiles").addEventListener("click", () => {
  homeScreen.classList.add("is-hidden");
  profileScreen.classList.remove("is-hidden");
  backgroundAudio.pause();
});

$("#openFirst").addEventListener("click", () => openViewer(0));
$("#playHero").addEventListener("click", () => {
  heroVideo.muted = false;
  heroVideo.play().catch(() => openViewer(0));
});
$("#closeViewer").addEventListener("click", closeViewer);
$("#prevMedia").addEventListener("click", () => moveViewer(-1));
$("#nextMedia").addEventListener("click", () => moveViewer(1));

document.addEventListener("keydown", (event) => {
  if (viewer.classList.contains("is-hidden")) return;
  if (event.key === "Escape") closeViewer();
  if (event.key === "ArrowLeft") moveViewer(-1);
  if (event.key === "ArrowRight") moveViewer(1);
});

document.addEventListener("error", handleMediaError, true);

heroVideo.addEventListener("canplay", () => {
  heroFallback.style.display = "none";
});

backgroundAudio.addEventListener("timeupdate", () => {
  const album = albums[state.albumIndex];
  const start = Number(album.audio.start) || 0;
  if (state.audioEnd && backgroundAudio.currentTime >= state.audioEnd) {
    backgroundAudio.currentTime = start;
    backgroundAudio.play().catch(() => {});
  }
});

renderProfiles();
passwordInput.focus();

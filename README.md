# Loveflix

A Netflix-inspired romantic gift site.

## Flow

- Password first: `280525`
- Three Netflix-style profiles
- Profile 1: 2 photos and 1 mini video
- Profile 2: 4 photos and 1 mini video
- Profile 3: 1 photo and 3 mini videos
- Every card says `tap to read message`
- Clicking a card opens the media with a romantic message

## Media File Names

Put files here if you want normal folder media:

- `media/intro/intro.jpg`
- `media/beginning/photo-01.jpg`
- `media/beginning/photo-02.jpg`
- `media/beginning/video-01.mp4`
- `media/beginning/hero.mp4`
- `media/adventures/photo-01.jpg`
- `media/adventures/photo-02.jpg`
- `media/adventures/photo-04.jpg`
- `media/adventures/photo-05.jpg`
- `media/adventures/video-01.mp4`
- `media/adventures/hero.mp4`
- `media/forever/photo-01.jpg`
- `media/forever/video-01.mp4`
- `media/forever/video-02.mp4`
- `media/forever/video-03.mp4`
- `media/forever/hero.mp4`
- `media/audio/asafi.mp3`
- `media/audio/perfect.mp3`
- `media/audio/him-and-i.mp3`

## Embed Media In Code

If you want the media inside code, put entries in `embedded-media.js` as data URLs.
The site checks `embedded-media.js` first, then falls back to files in `media/`.

Upload these files to GitHub:

- `index.html`
- `styles.css`
- `app.js`
- `embedded-media.js`

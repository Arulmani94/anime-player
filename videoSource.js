// Playback ADAPTER: turns an episode's data into a list of candidate sources.
// To change how videos are fetched later, edit only this file.

export function extractDriveId(url) {
  if (!url) return null;
  const m = url.match(/\/file\/d\/([\w-]{10,})/) || url.match(/[?&]id=([\w-]{10,})/);
  return m ? m[1] : null;
}

/** Returns sources in the order the player should try them. */
export function resolveSources(ep) {
  const list = [];
  if (ep.altVideoUrl) list.push({ kind: 'direct', url: ep.altVideoUrl });
  const id = extractDriveId(ep.driveUrl);
  if (ep.driveUrl) {
    if (id) {
      // Best-effort only: may work for small, public ("Anyone with the link") files.
      // Large files hit Google's virus-scan page; Google may also throttle or block it.
      list.push({
        kind: 'drive',
        url: `https://drive.google.com/uc?export=download&id=${id}`,
        openUrl: `https://drive.google.com/file/d/${id}/view`
      });
    } else {
      list.push({ kind: 'invalid', url: '' });
    }
  }
  return list;
}

export function describeError(source, mediaError) {
  if (source && source.kind === 'invalid') {
    return 'The Google Drive link is not valid. It should look like https://drive.google.com/file/d/FILE_ID/view?usp=sharing';
  }
  const code = mediaError && mediaError.code;
  if (source && source.kind === 'drive') {
    return 'Google Drive did not stream this file to the player. Common causes: the file is not shared as "Anyone with the link", it is too large (Google returns a virus-scan page instead of video), the download quota was exceeded, or the file is not an MP4 (H.264/AAC). Host the video where it has a direct file URL and put that in "altVideoUrl" (see README).';
  }
  if (code === 2) return 'Network error while loading the video. Check your connection and the URL.';
  if (code === 3) return 'The video could not be decoded. Re-encode it as MP4 (H.264 + AAC).';
  if (code === 4) return 'The video URL is unavailable, blocked, or in an unsupported format (use .mp4 or .webm).';
  return 'The video could not be played.';
}

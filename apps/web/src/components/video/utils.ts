const isYouTubeURL = (input: string): boolean => {
  return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(input);
};

const getVideoId = (input: string): string => {
  const url = new URL(input);
  const videoId = url.searchParams.get("v") ?? url.pathname;
  if (!videoId) {
    throw new Error("Could not extract video ID");
  }

  return videoId;
};

export { isYouTubeURL, getVideoId };

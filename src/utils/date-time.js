const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMilliseconds = now - date;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInSeconds / 3600);
  const diffInDays = Math.floor(diffInSeconds / (3600 * 24));

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInMinutes < 2) {
    return `1 min ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  } else if (diffInHours < 2) {
    const minutes = diffInSeconds % 3600;
    return `${diffInHours}h ${Math.floor(minutes / 60)}mins ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 2) {
    return `${diffInDays} day ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

export { formatRelativeTime };

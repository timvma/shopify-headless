"use client";
export default function Video({ media }) {
  const handleClick = (e) => {
    const video = e.target;
    if (video.paused) video.play();
    else video.pause();
  };
  return (
    <video
      autoPlay
      muted
      loop
      className="w-full h-full aspect-square object-cover"
      onClick={handleClick}
    >
      {media.sources.map((source, i) => (
        <source key={i} src={source.url} type={source.mimeType} />
      ))}
      Your browser does not support the video tag.
    </video>
  );
}

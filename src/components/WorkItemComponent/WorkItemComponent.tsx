import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../assets/video/logo_animated_hq.webm';
import { WorkItemData } from '../../pages/Work/Work';
import {
  ImageDescription,
  OriginalLayer,
  PreviewLayer,
  VideoPreview,
  // WorkSpannImage,
  WorkItemContainer,
} from '../../pages/work/Work.styled';

interface WorkItemComponentProps {
  work: WorkItemData;
  source: 'work' | 'photo';
}

const WorkItemComponent: React.FC<WorkItemComponentProps> = ({
  work,
  source,
}) => {
  const bucket = source === 'work' ? 'work-images' : 'photography-images';

  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isOriginalLoaded, setIsOriginalLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { folder, image_name, title, preview_url, vimeo_id } = work;
  const isVimeo = Boolean(vimeo_id);

  const src = `https://isglxygpyiuszrsqfttp.supabase.co/storage/v1/object/public/${bucket}/${folder}/${image_name}`;
  const isVideo = image_name.toLowerCase().endsWith('.mp4');

  const getPreviewUrl = () => {
    if (!preview_url) return src;
    return preview_url.startsWith('http')
      ? preview_url
      : `https://isglxygpyiuszrsqfttp.supabase.co/storage/v1/object/public/${bucket}/${folder}/${preview_url}`;
  };

  const previewSrc = getPreviewUrl();

  useEffect(() => {
    // Завантажуємо прев'ю
    const img = new Image();
    img.src = previewSrc;
    img.onload = () => {
      setIsLoading(false);

      // Попередньо завантажуємо оригінал
      if (!isVideo) {
        const originalImg = new Image();
        originalImg.src = src;
        originalImg.onload = () => setIsOriginalLoaded(true);
        originalImg.onerror = () =>
          console.error('Failed to preload original image:', src);
      }
    };
    img.onerror = () => {
      console.error('Failed to load preview image:', previewSrc);
      setIsLoading(false);
    };
  }, [previewSrc, src, isVideo]);

  useEffect(() => {
    if (isHovered && isVideo && !isVimeo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    } else if ((!isHovered || isVimeo) && isVideo && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered, isVideo, isVimeo]);

  if (isLoading) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
        }}
      >
        <video
          src={Loading}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '150px', height: '150px' }}
        />
      </div>
    );
  }

  return (
    <WorkItemContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="work-item"
    >
      {/* Базовий шар - прев'ю */}
      <PreviewLayer $isVisible={!isHovered} $imageUrl={previewSrc}>
        <img src={previewSrc} alt="preview" loading="eager" />
      </PreviewLayer>

      {/* Шар для зображень (показується при наведенні) */}
      {!isVideo && (
        <OriginalLayer $isVisible={isHovered && isOriginalLoaded}>
          <img
            src={src}
            alt="original"
            loading={isOriginalLoaded ? 'eager' : 'lazy'}
          />
        </OriginalLayer>
      )}

      {/* Шар для відео (показується при наведенні) */}
      {isHovered && (isVideo || isVimeo) && (
        <VideoPreview $isVisible={isHovered} $imageUrl={previewSrc}>
          {isVimeo ? (
            <iframe
              src={`https://player.vimeo.com/video/${vimeo_id}?autoplay=1&muted=1&loop=1&background=1`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: '-15%',
                left: 0,
                width: '100vw', // 👈 ключовий момент — viewport ширина
                height: '100vh',
                maxWidth: 'none',
                maxHeight: 'none',
                border: 'none',
                zIndex: 1,
              }}
            />
          ) : (
            <video
              ref={videoRef}
              src={src}
              muted
              loop
              preload="auto"
              playsInline
              disablePictureInPicture
            />
          )}
        </VideoPreview>
      )}

      {/* Заголовок (завжди присутній, але з анімацією) */}
      <ImageDescription $isVisible={isHovered}>{title}</ImageDescription>
    </WorkItemContainer>
  );
};

export default WorkItemComponent;

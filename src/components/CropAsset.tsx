import React from 'react';

export interface CropArea {
  src: string;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

export const CROP_PRESETS: Record<string, CropArea> = {
  heroTomatoes: {
    src: '/assets/aistudio/image_3838ae6d.png',
    sx: 28,
    sy: 370,
    sw: 968,
    sh: 372,
  },
  leafSpots: {
    src: '/assets/aistudio/image_3838ae6d.png',
    sx: 56,
    sy: 1092,
    sw: 198,
    sh: 168,
  },
  leafMiner: {
    src: '/assets/aistudio/image_58ce8d7a.png',
    sx: 456,
    sy: 457,
    sw: 512,
    sh: 292,
  },
  curledLeaves: {
    src: '/assets/aistudio/image_dc5b85f4.png',
    sx: 56,
    sy: 1140,
    sw: 198,
    sh: 168,
  },
  phonePhotoTip: {
    src: '/assets/aistudio/image_93756638.png',
    sx: 56,
    sy: 1180,
    sw: 198,
    sh: 168,
  },
};

interface CropAssetProps {
  preset?: keyof typeof CROP_PRESETS;
  crop?: CropArea;
  alt: string;
  className?: string;
}

export const CropAsset: React.FC<CropAssetProps> = ({
  preset,
  crop: customCrop,
  alt,
  className = '',
}) => {
  const crop = customCrop || (preset ? CROP_PRESETS[preset] : null);

  if (!crop) {
    return <div className={`bg-[#e8e4d8] ${className}`} />;
  }

  // Source image natural size in mockups: 1024 x 1536
  const naturalWidth = 1024;
  const naturalHeight = 1536;

  const widthScale = (naturalWidth / crop.sw) * 100;
  const heightScale = (naturalHeight / crop.sh) * 100;
  const leftPercent = -(crop.sx / crop.sw) * 100;
  const topPercent = -(crop.sy / crop.sh) * 100;

  return (
    <div className={`overflow-hidden relative select-none pointer-events-none ${className}`}>
      <img
        src={crop.src}
        alt={alt}
        style={{
          position: 'absolute',
          width: `${widthScale}%`,
          height: `${heightScale}%`,
          left: `${leftPercent}%`,
          top: `${topPercent}%`,
          maxWidth: 'none',
          maxHeight: 'none',
        }}
      />
    </div>
  );
};

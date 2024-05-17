const ProfileHolder = () => {
  return (
    <svg
      width='64'
      height='64'
      viewBox='0 0 64 64'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_467_578)'>
        <g filter='url(#filter0_d_467_578)'>
          <path
            d='M32.0002 5.33398C17.2726 5.33398 5.3335 17.2731 5.3335 32.0006C5.3335 46.7281 17.2726 58.6673 32.0002 58.6673C46.7276 58.6673 58.6668 46.7281 58.6668 32.0006C58.6668 17.2731 46.7276 5.33398 32.0002 5.33398Z'
            fill='#94A3B8'
          />
        </g>
        <path
          d='M32.0001 37.5C17.3335 37.5 11.5 48.5 11.5 48.5C18.1106 56.5775 27.0001 58 32.0001 58C37.3071 58 46.389 56 52 48.9225C52 48.9225 46.6667 37.5 32.0001 37.5Z'
          fill='#E2E8F0'
        />
        <path
          d='M32 32C36.4184 32 40 28.4184 40 24C40 19.5817 36.4184 16 32 16C27.5816 16 24 19.5817 24 24C24 28.4184 27.5816 32 32 32Z'
          fill='#E2E8F0'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_467_578'
          x='1.3335'
          y='3.33398'
          width='61.3335'
          height='61.334'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='2' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_467_578'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_467_578'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_467_578'>
          <rect width='64' height='64' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ProfileHolder;

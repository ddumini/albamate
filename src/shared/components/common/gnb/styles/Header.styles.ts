export const headerWrapper = `
  fixed top-0 z-50 w-full 
  border-b border-gray-100 backdrop-blur 
  bg-white/50 dark:bg-gray-900/80
  dark:border-gray-500 
`;

export const innerWrapper = `
  mx-auto px-24 flex md:max-w-none lg:max-w-1528 items-center justify-between
`;

export const leftGroup = `
  flex items-center md:gap-32 lg:gap-48
`;

export const navButton = (active: boolean) =>
  `transition-colors ${active ? 'text-mint-100' : ''}`;

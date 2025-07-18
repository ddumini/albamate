export const headerWrapper = `
  fixed top-0 z-50 w-full 
  border-b border-gray-100 backdrop-blur 
  bg-white/50 dark:bg-gray-900/80
  px-24 md:px-72 
  dark:border-gray-500 dark:bg-black/50
  mb-40 md:mb-64
`;

export const innerWrapper = `
  mx-auto flex max-w-1479 items-center justify-between px-4
`;

export const leftGroup = `
  flex items-center md:gap-32 lg:gap-48
`;

export const navButton = (active: boolean) =>
  `transition-colors ${active ? 'text-mint-100' : ''}`;

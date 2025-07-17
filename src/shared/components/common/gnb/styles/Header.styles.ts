export const headerWrapper = `
  w-full border-b border-gray-100 px-24 md:px-72 dark:border-gray-500
`;

export const innerWrapper = `
  mx-auto flex max-w-1479 items-center justify-between px-4
`;

export const leftGroup = `
  flex items-center md:gap-32 lg:gap-48
`;

export const navButton = (active: boolean) =>
  `transition-colors ${active ? 'text-mint-100' : ''}`;

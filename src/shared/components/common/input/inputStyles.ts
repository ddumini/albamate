export const inputStyle = {
  default: `
    text-lg font-normal text-black-400 placeholder:text-gray-400 lg:text-xl dark:text-gray-100
    rounded-lg caret-mint-300 outline-mint-300 focus:outline dark:caret-mint-350 dark:outline-mint-350
    transition duration-200
  `,
  invalid:
    'border border-error caret-error dark:caret-error hover:border-error focus:border-0 ',
};

export const inputVariants = {
  solid:
    'bg-background-200 hover:bg-background-300 dark:bg-gray-800 dark:hover:bg-gray-700',
  outlined:
    'border border-gray-200 hover:border-gray-400 focus:border-mint-300',
};

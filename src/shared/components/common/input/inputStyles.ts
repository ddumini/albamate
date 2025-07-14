export const inputStyle = {
  default: `
    text-lg font-normal text-black-400 placeholder:text-gray-400 lg:text-xl
    rounded-lg caret-mint-300 outline-mint-300 focus:outline
    transition duration-200
  `,
  invalid:
    'border border-error caret-error hover:border-error focus:border-error focus:outline-error',
};

export const inputVariants = {
  solid: 'bg-background-200 hover:bg-background-300',
  outlined:
    'border border-gray-200 hover:border-gray-400 focus:border-mint-300',
};

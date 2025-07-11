interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const ButtonBase = ({ children, className, ...props }: ButtonBaseProps) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default ButtonBase;

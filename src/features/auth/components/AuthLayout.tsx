const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <section className="flex flex-col gap-48">{children}</section>;
};

export default AuthLayout;

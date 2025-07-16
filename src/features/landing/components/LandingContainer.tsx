import { PropsWithChildren } from 'react';

const LandingContainer = ({ children }: PropsWithChildren) => {
  return <div className="mx-auto flex w-1140 justify-between">{children}</div>;
};

export default LandingContainer;

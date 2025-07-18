import { ReactNode } from 'react';

const AddFormSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col gap-12 lg:gap-16">{children}</section>
  );
};
export default AddFormSection;

'use client';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="mt-52 md:mt-72 lg:mt-84">{children}</main>
    </div>
  );
};

export default PublicLayout;

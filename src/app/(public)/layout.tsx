'use client';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="mt-48 md:mt-64 lg:mt-80">{children}</main>
    </div>
  );
};

export default PublicLayout;

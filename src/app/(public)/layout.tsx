'use client';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="lg:mt-160">{children}</main>
    </div>
  );
};

export default PublicLayout;

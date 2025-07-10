import ThemeToggle from "@/shared/components/ThemeToggle";

const test = () => {
  return (
    <div className="text-md bg-mint-100">
      <div className="bg-gray-200">Hello Mint</div>

      <p className="">layer</p>
      <div className="BG-mint">Mint</div>
      <ThemeToggle />
    </div>
  );
};

export default test;

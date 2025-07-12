const DayCheckbox = ({ day }: { day: string }) => {
  return (
    <li>
      <label
        className="flex h-48 w-38 items-center justify-center rounded-md bg-background-200 has-checked:bg-mint-300 has-checked:text-white"
        htmlFor={day}
      >
        {day}
      </label>
      <input className="sr-only" id={day} name="" type="checkbox" />
    </li>
  );
};

export default DayCheckbox;

import Dropdown from '@/shared/components/ui/Dropdown';

const Filter = () => {
  return (
    <Dropdown trigger={<button>Filter</button>}>
      <li>
        <button>Filter</button>
      </li>
    </Dropdown>
  );
};

export default Filter;

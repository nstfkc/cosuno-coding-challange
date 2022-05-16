import { useURLSearchParams } from "../hooks/useURLSearchParams";
import { Filter } from "../types";

interface FilterProps {
  filters: Filter[];
}

export const Filters = ({ filters }: FilterProps) => {
  const { toggle, checkIfFilterIsActive } = useURLSearchParams();
  return (
    <div className="px-4">
      {filters.map((filter) => (
        <div key={filter.slug}>
          <h2 className="text-gray-800 font-bold text-lg py-2">
            {filter.title}
          </h2>
          <ul role="list">
            {filter.items.map((item) => {
              return (
                <li key={item.slug}>
                  <label htmlFor={item.slug}>
                    <input
                      type="checkbox"
                      value={item.slug}
                      name={item.slug}
                      id={item.slug}
                      checked={checkIfFilterIsActive(filter.slug, item.slug)}
                      onChange={() => toggle(filter.slug, item.slug)}
                    />
                    <span className="px-2">{item.name}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

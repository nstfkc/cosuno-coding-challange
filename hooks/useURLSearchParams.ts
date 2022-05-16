import { useRouter } from "next/router";
import { useCallback } from "react";

type Helper<T = void> = (key: string, value: string) => T;

interface UrlSearchParamsHelpers {
  toggle: Helper;
  replace: Helper;
  checkIfFilterIsActive: Helper<boolean>;
}

export function useURLSearchParams(): UrlSearchParamsHelpers {
  const { query, push } = useRouter();

  const getCurrentValues = useCallback(
    (filterSlug: string) => {
      const result = query[filterSlug];
      if (!result) {
        return [];
      }
      if (typeof result === "string") {
        return [result];
      }
      return result;
    },
    [query]
  );

  const checkIfFilterIsActive = useCallback(
    (filterSlug: string, slug: string) =>
      getCurrentValues(filterSlug).includes(slug),
    [getCurrentValues]
  );

  const update = useCallback(
    (replace = false): Helper =>
      (key, value) => {
        const currentValues = getCurrentValues(key);
        const isActive = checkIfFilterIsActive(key, value);

        if (currentValues && currentValues.length === 0 && value === "") {
          return;
        }

        const next = isActive
          ? currentValues.filter((item) => item !== value)
          : [...(replace ? [] : currentValues), value];

        push({ pathname: "/", query: { ...query, [key]: next } });
      },
    [push, checkIfFilterIsActive, getCurrentValues, query]
  );

  return {
    toggle: update(),
    replace: update(true),
    checkIfFilterIsActive,
  };
}

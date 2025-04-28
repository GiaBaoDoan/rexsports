import { useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: any) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (value === "null" || !value) {
      currentParams.delete(key);
    } else {
      currentParams.set(key, `${value}`);
    }

    router.push(`?${currentParams}`);
  };

  const onClearSearchParams = () => {
    router.push(window.location.pathname);
  };
  return {
    updateQuery,
    onClearSearchParams,
  };
};

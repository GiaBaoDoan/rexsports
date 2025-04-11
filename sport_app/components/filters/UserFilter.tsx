"use client";

import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/hooks/use-debounce";
import { filterByEmail } from "@/store/slice/users";
import { useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";

const UserFilter = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

  const debounced = useDebouncedValue(email);

  useEffect(() => {
    dispatch(filterByEmail(debounced));
  }, [debounced, dispatch]);

  return (
    <>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        className="w-[300px]"
        placeholder="Lọc email..."
      />
    </>
  );
};

export default UserFilter;

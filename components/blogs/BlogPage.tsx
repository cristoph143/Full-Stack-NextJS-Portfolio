// BlogsPage.tsx
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@radix-ui/react-icons";
import debounce from "lodash.debounce";
import BlogsList from "./BlogList";

const SearchBar: React.FC<{ onChange: (value: string) => void }> = ({
  onChange,
}) => (
  <div className="relative">
    <MagnifyingGlassIcon className="absolute top-[10px] left-[10px] text-gray-400" />
    <Input
      type="text"
      placeholder="Enter blog title"
      className="pl-8"
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  </div>
);

const NavigationButtons: React.FC<{
  disabled: boolean;
  onClick: () => void;
  direction: "left" | "right";
}> = ({ disabled, onClick, direction }) => (
  <Button disabled={disabled} variant="outline" size="icon" onClick={onClick}>
    {direction === "left" ? (
      <ChevronLeftIcon className="w-4 h-4" />
    ) : (
      <ChevronRightIcon className="w-4 h-4" />
    )}
  </Button>
);

export default function BlogsPage() {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      data: [],
      loading: true,
      searchTerm: "",
      page: 0,
    }
  );

  const fetchBlogs = async (value: string = "", page: number = 0) => {
    setResponse({ loading: true });

    const apiResponse = await fetch(
      `/api/blogs?term=${value}&page=${page}&limit=20`,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    setResponse({
      data: apiResponse.data,
      loading: false,
    });
  };

  const deleteBlog = async (id: string) => {
    setLoading(true);
    const res = await fetch("/api/blogs", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const apiResponse = await res.json();
    if (apiResponse?.status === 204) {
      // Reload the list data
      fetchBlogs();
    }

    setLoading(false);
  };

  const debounceAPI = useCallback(
    debounce((value: string) => fetchBlogs(value), 1000),
    []
  );

  // Use useEffect to fetch blogs only once when the component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="flex justify-between mb-8">
        <SearchBar
          onChange={(value) => {
            setResponse({ searchTerm: value });
            debounceAPI(value);
          }}
        />
        <div className="text-right">
          <NavigationButtons
            disabled={response.page === 0}
            onClick={() => {
              const page = response.page - 1;
              setResponse({ page });
              fetchBlogs(response.term, page);
            }}
            direction="left"
          />
          <NavigationButtons
            disabled={false}
            onClick={() => {
              const page = response.page + 1;
              setResponse({ page });
              fetchBlogs(response.term, page);
            }}
            direction="right"
          />
        </div>
      </div>

      {response.loading ? (
        <div className="animate-pulse">
          <div className="h-2 col-span-2 rounded bg-slate-200"></div>
          <div className="h-2 col-span-1 mt-3 rounded bg-slate-200"></div>
        </div>
      ) : (
        <BlogsList
          blogs={response.data}
          onDelete={deleteBlog}
          loading={loading}
        />
      )}
    </>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import {
  TrashIcon,
  ReloadIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";

// Reusable LoadingPlaceholder component
const LoadingPlaceholder = () => (
  <div className="animate-pulse">
    <div className="h-2 col-span-2 rounded bg-slate-200"></div>
    <div className="h-2 col-span-1 mt-3 rounded bg-slate-200"></div>
  </div>
);

// Reusable ProjectItem component
const ProjectItem = ({
  id,
  title,
  description,
  onDelete,
  loading,
}: {
  id: string;
  title: string;
  description: string;
  onDelete: () => void;
  loading: boolean;
}) => (
  <div key={id} className="flex justify-between mb-4 group">
    <div>
      <Link
        className="text-xl font-semibold text-blue-600"
        href={`/admin/projects/${id}`}
      >
        {title}
      </Link>
      <p className="text-sm text-gray-500 font-extralight">
        {description ? description : "No description"}
      </p>
    </div>
    <div className="opacity-0 group-hover:opacity-90">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"}>
            <TrashIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete confirmation?</DialogTitle>
            <DialogDescription>
              Make sure you want to delete <b>{title}</b>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-5">
            <Button
              type="submit"
              onClick={() => {
                onDelete();
              }}
              variant={"destructive"}
            >
              {loading ? (
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
);

export default function ProjectPage() {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useReducer(
    (prev: any, next: any) => ({ ...prev, ...next }),
    {
      data: [],
      loading: true,
      searchTerm: "",
      page: 0,
    }
  );

  const fetchProjects = async (value: string = "", page: number = 0) => {
    setResponse({ loading: true });
    const res = await fetch(
      `/api/projects?term=${value}&page=${page}&limit=20`,
      {
        method: "GET",
      }
    );
    const responseData = await res.json();

    setResponse({
      data: responseData.data,
      loading: false,
    });
  };

  const deleteProject = async (id: string) => {
    setLoading(true);
    const res = await fetch("/api/projects", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const response = await res.json();
    if (response?.status === 204) {
      fetchProjects();
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const debounceAPI = useCallback(
    debounce((value: string) => fetchProjects(value), 1000),
    []
  );

  return (
    <>
      <div className="flex justify-between mb-5">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute top-[10px] left-[10px] text-gray-400" />
          <Input
            type="text"
            placeholder="Enter project title"
            className="pl-8"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setResponse({ searchTerm: e.target.value });
              debounceAPI(e.target.value);
            }}
          />
        </div>
        <div className="text-right">
          <Button
            disabled={response.page === 0}
            variant="outline"
            size="icon"
            onClick={() => {
              const page = response.page - 1;
              setResponse({ page });
              fetchProjects(response.term, page);
            }}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const page = response.page + 1;
              setResponse({ page });
              fetchProjects(response.term, page);
            }}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {response.loading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          {response.data.length > 0 ? (
            <>
              {response.data.map(
                (d: { title: string; id: string; description: string }) => (
                  <ProjectItem
                    key={d.id}
                    id={d.id}
                    title={d.title}
                    description={d.description}
                    onDelete={() => deleteProject(d.id)}
                    loading={loading}
                  />
                )
              )}
            </>
          ) : (
            <h1>No data found</h1>
          )}
        </>
      )}
    </>
  );
}

// BlogsList.tsx
import React from "react";
import Link from "next/link";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BlogsListProps {
  blogs: {
    title: string;
    id: string;
    description: string;
  }[];
  onDelete: (id: string) => void;
  loading: boolean;
}

const BlogItem: React.FC<{
  blog: BlogsListProps["blogs"][0];
  onDelete: BlogsListProps["onDelete"];
  loading: BlogsListProps["loading"];
}> = ({ blog, onDelete, loading }) => (
  <div key={blog.id} className="flex justify-between mb-4 group">
    <div>
      <Link
        className="text-xl font-semibold text-blue-600"
        href={`/admin/blogs/${blog.id}`}
      >
        {blog.title}
      </Link>
      <p className="text-sm text-gray-500 font-extralight">
        {blog?.description ? blog?.description : "No description"}
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
              Make sure you want to delete <b>{blog.title}</b>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-5">
            <Button
              type="submit"
              onClick={() => onDelete(blog.id)}
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

const BlogsList: React.FC<BlogsListProps> = ({ blogs, onDelete, loading }) => (
  <>
    {blogs.length > 0 ? (
      <>
        {blogs.map((blog) => (
          <BlogItem
            key={blog.id}
            blog={blog}
            onDelete={onDelete}
            loading={loading}
          />
        ))}
      </>
    ) : (
      <h1>No data found</h1>
    )}
  </>
);

export default BlogsList;

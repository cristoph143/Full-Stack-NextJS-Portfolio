"use client";
// @ts-ignore
import { Editor, editorProps } from "novel";
import { Button } from "@/components/ui/button";
import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCallback, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Select, { MultiValue } from "react-select";
import { Textarea } from "@/components/ui/textarea";

type Variants = "blog" | "project";

interface BlogFormProps {
  id?: string;
  variant?: Variants;
  value?: {
    title: string;
    content: string;
    description: string;
    tags: string[];
    cover_url: string;
  };
}

const blogsTags = [
  {
    label: "HTML",
    value: "HTML",
    name: "HTML",
  },
  {
    label: "CSS",
    value: "CSS",
    name: "CSS",
  },
  {
    label: "JavaScript",
    value: "JavaScript",
    name: "JavaScript",
  },
];

const useAPI = (url: string, method: string, body: any) =>
  fetch(url, {
    method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

const useUpload = (file: File) =>
  fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-type": file.type,
      "X-Vercel-Filename": file.name,
    },
    body: file,
  }).then((res) => res.json());

const getDefaultValue = (value: string[]) =>
  value.map((v) => ({ label: v, name: v, value: v }));

const FormSection: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="mt-5">
    <Label htmlFor={label.toLowerCase()} className="capitalize">
      {label}
    </Label>
    {children}
  </div>
);

const ImageUpload: React.FC<{
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string;
}> = ({ onChange, imageUrl }) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <Label htmlFor="picture" className="capitalize">
      Cover Image
    </Label>
    <div className="max-w-[120px]">
      {imageUrl && <img src={imageUrl} className="w-full h-auto rounded-md" />}
    </div>
    <Input id="picture" type="file" onChange={onChange} />
  </div>
);

const BlogForm: React.FC<BlogFormProps> = ({ id, variant = "blog", value }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [blogForm, setBlogForm] = useReducer(
    (prev: any, next: any) => ({ ...prev, ...next }),
    {
      title: value?.title || "",
      content: value?.content || "",
      description: value?.description || "",
      tags: value?.tags || [],
      cover_url: value?.cover_url || "",
    }
  );

  const updateContent = useCallback((data: editorProps) => {
    setBlogForm({ content: data.getJSON() });
  }, []);

  const onSubmit = async (apiPath: string, listPath: string) => {
    setLoading(true);
    const url = id ? `${apiPath}?id=${id}` : apiPath;
    const req = await useAPI(url, id ? "PATCH" : "POST", blogForm);
    setLoading(false);

    if (req?.data?.id) {
      router.push(listPath);
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files?.length > 0) {
      const file = files[0];
      const response = await useUpload(file);
      setBlogForm({ cover_url: response.url });
    }
  };

  return (
    <>
      <FormSection label={`${variant} Title`}>
        <Input
          type="email"
          placeholder="Email"
          value={blogForm.title}
          onChange={(e) => {
            setBlogForm({ title: e.target.value });
          }}
          className="mt-2"
        />
      </FormSection>

      <FormSection label={`${variant} Description`}>
        <Textarea
          placeholder="Description"
          value={blogForm.description}
          onChange={(e) => {
            setBlogForm({ description: e.target.value });
          }}
          className="mt-2"
        />
      </FormSection>

      <FormSection label={`${variant} Cover Image`}>
        <ImageUpload onChange={onFileChange} imageUrl={blogForm.cover_url} />
      </FormSection>

      <FormSection label={`${variant} Content`}>
        <Editor
          editorProps={{}}
          onDebouncedUpdate={updateContent}
          defaultValue={blogForm.content}
          className="pb-8 mt-2 border rounded"
          disableLocalStorage
        />
      </FormSection>

      <FormSection label={`${variant} Tags`}>
        <Select
          defaultValue={getDefaultValue(blogForm.tags)}
          isMulti
          name="tags"
          options={blogsTags}
          onChange={(value: MultiValue<{ name: string }>) => {
            if (value && value.length > 0) {
              const tags = value.map((v: { name: string }) => v?.name);

              setBlogForm({ tags: tags });
            }
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </FormSection>

      <div className="mt-4 text-right">
        <Button
          onClick={() =>
            variant === "blog"
              ? router.push(`/admin/${variant}s`)
              : router.push(`/admin/${variant}s`)
          }
        >
          Cancel
        </Button>
        <Button
          className="ml-5"
          onClick={() => onSubmit(`/api/${variant}s`, `/admin/${variant}s`)}
        >
          {loading ? (
            <>
              <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              <CheckIcon className="mr-2" />
              Save
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default BlogForm;

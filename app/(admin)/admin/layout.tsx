import MainLayout from "@/components/MainLayout";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  return <MainLayout>{children}</MainLayout>;
}
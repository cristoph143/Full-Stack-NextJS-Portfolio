import MainLayout from "@/components/layout/MainLayout";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  return <MainLayout>{children}</MainLayout>;
}

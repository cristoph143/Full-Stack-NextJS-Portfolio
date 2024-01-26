import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { createClient } from "@supabase/supabase-js";

export default function AvatarDropdownMenu({ user, signOut }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>{user?.email && user.email[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem className="text-gray-500">
          {user.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={signOut}>
          <button className="block w-full px-2 py-2 text-sm text-left no-underline rounded-md hover:bg-gray-100 bg-btn-background">
            Logout
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

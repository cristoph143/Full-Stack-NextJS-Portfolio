// AvatarDropdownMenu.tsx
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

interface MenuItem {
  label: string;
  action?: () => void;
  href?: string;
}

interface Props {
  triggerContent: JSX.Element;
  items: MenuItem[];
}

export default function ReusableDropdownMenu({ triggerContent, items }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerContent}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="text-gray-500 cursor-pointer"
            onSelect={item.action}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

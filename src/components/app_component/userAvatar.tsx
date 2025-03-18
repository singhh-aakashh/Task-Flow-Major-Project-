"use client"
import { useUser } from "@/lib/store/userStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Logout from "./logout";


export default  function UserAvatar() {
    const user:any = useUser();

    const fname = user?.email ? user.email.charAt(0).toUpperCase() : "A";
  
  return (
    <DropdownMenu>
         <DropdownMenuTrigger asChild>
      <button type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{fname}</span>
      </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4 mr-2 w-56">
        <DropdownMenuLabel><Logout/></DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

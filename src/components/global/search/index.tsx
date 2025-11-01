import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/useSearch";
import { User } from "lucide-react";
import React from "react";
import Loader from "../loader";

type Props = {
  workspaceId: string;
};

const Search = ({ workspaceId }: Props) => {
  const { query, onSearchQuery, isFetching } = useSearch("get-users", "USERS");
  
  const onUsers = [
    {
      id: "usr_001",
      firstname: "Alice",
      lastname: "Johnson",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      subscription: {
        plan: "Pro",
      },
    },
    {
      id: "usr_002",
      firstname: "Marcus",
      lastname: "Lee",
      image: "https://randomuser.me/api/portraits/men/21.jpg",
      subscription: {
        plan: "Free",
      },
    },
    {
      id: "usr_003",
      firstname: "Nina",
      lastname: "Patel",
      image: null, // triggers AvatarFallback <User /> icon
      subscription: {
        plan: "Enterprise",
      },
    },
  ];

  // WIP: Wire up sending invitations
  // const { mutate, isPending } = useMutationData(["invite-member"]);

  return (
    <div className="flex flex-col gap-y-5">
      <Input
        onChange={onSearchQuery}
        value={query}
        className="bg-transparent border-2 outline-none"
        type="text"
        placeholder="Search for your user..."
      />

      {isFetching ? (
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-8 rounded-xl" />
        </div>
      ) : !onUsers || onUsers.length === 0 ? (
        <p className="text-center text-sm text-[#a4a4a4]">No Users Found</p>
      ) : (
        <div>
          {onUsers.map((user) => (
            <div
              key={user.id}
              className="flex gap-x-3 items-center border-2 w-full p-3 rounded-xl"
            >
              <Avatar>
                <AvatarImage src={user.image ?? ""} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <h3 className="font-bold text-lg capitalize">
                  {user.firstname} {user.lastname}
                </h3>
                <p className="lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]">
                  {user.subscription?.plan ?? "Free"}
                </p>
              </div>

              <div className="flex-1 flex justify-end items-center">
                <Button
                  onClick={() => {}}
                  variant="default"
                  className="w-[100px] max-sm:w-[60px] font-bold bg-white text-black"
                >
                  <Loader state={false} color="#000">
                    Invite
                  </Loader>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

import React from "react";
import { getNotifications, onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkspaces,
  verifyAccessToWorkspace,
} from "@/actions/workspace";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Sidebar from "@/components/global/sidebar";

type Props = {
  params: { workspaceid: string };
  children: React.ReactNode;
};

const page = async ({ params: { workspaceid }, children }: Props) => {
  const auth = await onAuthenticateUser();

  if (!auth.user || !auth.user.workspace) redirect("/auth/sign-in");
  if (!auth.user.workspace.length) redirect("/auth/sign-in");

  const hasAccess = await verifyAccessToWorkspace(workspaceid);

  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (!hasAccess.data?.workspace) return null;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceid),
  });

  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceid),
  });

  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkspaces(),
  });

  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen">
        <Sidebar activeWorkspaceId={workspaceid} />
      </div>
    </HydrationBoundary>
  );
};

export default page;

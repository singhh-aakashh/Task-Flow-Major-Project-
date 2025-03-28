import PageLayout from "@/components/app_component/pageLayout";
import { SessionProvider } from "next-auth/react";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){

    return(
      <SessionProvider>
       <PageLayout>
        {children}
       </PageLayout>
       </SessionProvider>
    )
}

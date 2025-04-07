
import PageLayout from "@/components/app_component/pageLayout";
import PageLayoutWrapper from "@/components/app_component/pageLayoutWrapper";
import { SessionProvider } from "next-auth/react";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){


    return(
      <SessionProvider>
       <PageLayoutWrapper>
        {children}
       </PageLayoutWrapper>
       </SessionProvider>
    )
}

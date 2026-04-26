import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { DemoLauncher } from "@/components/site/demo-launcher";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <DemoLauncher mode="public" />
    </>
  );
}

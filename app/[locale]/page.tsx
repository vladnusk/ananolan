import { setRequestLocale } from "next-intl/server";
import { getBusinessCard } from "@/lib/content";
import { BusinessCardPage } from "@/components/BusinessCardPage";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

export default async function MainHomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const doc = await getBusinessCard();
  if (!doc) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-business-card-gray-bg px-4">
        <div className="text-center text-taxes-gray-600">
          <h1 className="text-2xl font-bold text-taxes-gray-900">Business Card</h1>
          <p className="mt-2">Add content/main/business-card/en.md</p>
        </div>
      </div>
    );
  }
  return <BusinessCardPage data={doc.frontmatter} />;
}

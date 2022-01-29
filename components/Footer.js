import Link from "next/link";
import { ArticleEditLink, GithubPages, IssuesLink, SITENAME } from "../pages/api/constants";

const Links = [
  {
    text: "About Genipap Biologic",
    uri: "/e/About_Genipap_Biologic"
  },
  {
    text: "Submit an article",
    uri: ArticleEditLink,
  },
  {
    text: "Creating a new page",
    uri: GithubPages
  },
  {
    text: "Submission issues",
    uri: IssuesLink
  }
];

export default function Footer() {
  return (
    <>
      <div className="mt-12 bg-gray-100 border-t px-6 md:px-16 py-6">
        <div>&copy; {SITENAME} 2021-{new Date().getFullYear()}</div>
        <div className="mt-4 flex gap-4 flex-col md:flex-row">
          {Links.map((item) => (
            <Link href={item.uri}>
              <a className="text-neutral-500 hover:underline text-sm">{item.text}</a>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-xs text-neutral-500">{SITENAME}, an unit of Genipap Corporation</div>
      </div>
    </>
  )
}
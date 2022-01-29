import { MenuIcon, NewspaperIcon, PencilIcon, SearchIcon, ExclamationCircleIcon } from "@heroicons/react/outline";
import { HomeIcon, PencilAltIcon, AtSymbolIcon, XCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ArticleEditLink, GithubPages, IssuesLink } from "../pages/api/constants"

const navIconsLeft = [
  {
    icon: <PencilIcon className="h-5 w-5" />,
    title: "Submit an article",
    uri: ArticleEditLink
  },
  {
    icon: <NewspaperIcon className="h-6 w-6" />,
    title: "Sign up for newsletter",
    uri: "/newsletter"
  }
];

const NavMenuItems = [
  {
    text: "Home",
    uri: "/home",
    icon: <HomeIcon className="h-5 w-5" />,
    class: ""
  },
  {
    text: "Submit an article",
    uri: ArticleEditLink,
    icon: <PencilAltIcon className="h-5 w-5" />,
    class: "mt-[1px]"
  },
  {
    text: "Newsletter",
    uri: "/newsletter",
    icon: <NewspaperIcon className="h-5 w-5" />,
    class: "mt-[1px]"
  },
  {
    text: "About Genipap Biologic",
    uri: "/e/About_Genipap_Biologic",
    icon: <AtSymbolIcon className="h-5 w-5" />,
    class: "mt-4"
  },
  {
    text: "Creating a new page",
    uri: GithubPages,
    icon: <QuestionMarkCircleIcon className="h-5 w-5" />,
    class: "mt-4"
  },
  {
    text: "Submission issues",
    uri: IssuesLink,
    icon: <ExclamationCircleIcon className="h-5 w-5" />,
    class: "mt-[1px]"
  }
];

export default function Nav() {

  const [search, setSearch] = useState(false);

  return (
    <>
      <div className="bg-gray-100 shadow border-b sticky top-0 z-50">
        <div className="max-w-4xl flex mx-auto justify-between items-center h-12 md:h-16 px-6">
          <div className="gap-2 flex items-center flex-1">
            <Menu>
              <Menu.Button title="Open menu" className="h-12 w-12 grid place-items-center hover:bg-gray-200"><MenuIcon className="h-6 w-6" /></Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="fixed top-0 left-0 bottom-0 bg-gray-200 w-80 shadow-xl z-[99]">
                  {NavMenuItems.map((item) => (
                    <Menu.Item key={item.uri}>
                      <Link href={item.uri}>
                        <a className={`flex h-12 px-6 bg-white items-center gap-3 hover:bg-gray-100 ${item.class}`}>
                          {item.icon}
                          <div className="font-bold">{item.text}</div>
                        </a>
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
            <Link href={`/`}>
              <a className="flex gap-1 items-center">
                <div className="h-6 w-6 relative">
                  <Image src={`/favicon.webp`} layout="fill" objectFit="cover" />
                </div>
                <div className="font-bold font-serif italic text-2xl text-teal-700">Biologic</div>
              </a>
            </Link>
          </div>
          <div className="flex-[2] md:flex hidden">
            <div className="flex gap-2 bg-white px-2 py-2 focus-within:ring-2 items-center w-full">
              <SearchIcon className="h-5 w-5 flex-1" />
              <input placeholder="Search Genipap Biologic" className="block bg-transparent flex-[11] outline-none" />
            </div>
          </div>
          <div className="flex items-center flex-1 justify-end">
            {navIconsLeft.map((icon) => (
              <Link href={icon.uri} key={icon.uri}>
                <a className="h-12 grid place-items-center hover:bg-gray-200 w-12" title={icon.title}>
                  {icon.icon}
                </a>
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button class="h-12 hover:bg-gray-200 w-12 grid place-items-center" onClick={() => setSearch(true)}>
              <SearchIcon className="h-6 w-6" />
            </button>
            { search && 
                <div className="fixed top-0 left-0 right-0 h-12 bg-gray-100 flex items-center gap-4 px-6 z-[51]">
                  <div className="flex gap-2 bg-white px-2 h-8 focus-within:ring-2 items-center w-full">
                    <SearchIcon className="h-5 w-5 flex-1" />
                    <input placeholder="Search Genipap Biologic" className="block bg-transparent flex-[11] outline-none" />
                  </div>
                  <button onClick={() => setSearch(false)}><XCircleIcon className="h-6 w-6" /></button>
                </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}
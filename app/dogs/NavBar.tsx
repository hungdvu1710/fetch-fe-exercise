import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import FavDogs from "./FavDogs";

const navTriggerClassNames =
  "py-2 px-3 outline-none select-none font-semibold text-base leading-6 rounded-md text-violet-600 focus:ring-2 focus:ring-violet-400 hover:bg-violet-200";
const caretIconClassNames =
  "relative text-violet-500 top-1 transform transition-transform-250 ease";
const navContentClassNames =
  "absolute top-0 left-0 w-full animation-duration-250 ease";
const log_out_url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/logout";

const NavBar = () => {
  const router = useRouter();
  const logOut = async () => {
    try {
      await fetch(log_out_url, { credentials: "include" });
      router.push("/");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <NavigationMenu.Root className="relative flex justify-center w-full z-10">
      <NavigationMenu.List className="flex justify-center align bg-white p-1 gap-1 rounded-lg list-none shadow-lg">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={"flex " + navTriggerClassNames}>
            Favorite{" "}
            <CaretDownIcon className={caretIconClassNames} aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className={navContentClassNames}
            style={{ margin: "4px" }}
          >
            <FavDogs />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={"flex " + navTriggerClassNames}>
            Search Locations{" "}
            <CaretDownIcon className={caretIconClassNames} aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className={navContentClassNames}
          ></NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item className="relative">
          <button
            className={navTriggerClassNames}
            onClick={logOut}
          >
            Log Out
          </button>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="flex items-end justify-center h-12 top-full overflow-hidden z-1 transition-width transform-250 ease">
          <div className="w-10 h-10 bg-white transform rotate-45 rounded-tl-2" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="absolute flex justify-center w-full top-full perspective-2000">
        <NavigationMenu.Viewport className="m-2 w-full bg-white rounded-lg overflow-hidden shadow-2xl h-96 transition-width transform-300 ease" />
      </div>
    </NavigationMenu.Root>
  );
};

export default NavBar;

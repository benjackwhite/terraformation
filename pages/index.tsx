import type { NextPage } from "next";
import NextLink from "../components/core/NextLink";

const Home: NextPage = () => {
  return (
    <div className={""}>
      <NextLink href={"/dashboard"}>
        <a
          href="#"
          className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
        >
          Get started
        </a>
      </NextLink>
    </div>
  );
};

export default Home;

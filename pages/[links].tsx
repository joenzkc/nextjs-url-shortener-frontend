import React, { useEffect } from "react";
import axios from "axios";
import { Url } from "@/types/url.type";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { redirect } from "next/navigation";
import { Router, useRouter } from "next/router";
import Loading from "@/components/loading";

interface IParams extends ParsedUrlQuery {
  link: string;
  url: string;
}
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const backend: string =
      process.env.NEXT_PUBLIC_BACKEND_URL + "url/all" || "";
    const req = await axios.get(backend);
    const pages: Url[] = req.data;
    const paths = pages.map((page) => {
      return {
        params: {
          links: page.shortened_url,
        },
      };
    });

    return { paths, fallback: true };
  } catch (err) {
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { links } = ctx.params as IParams;
  const req = {
    shortened_url: links,
  };
  // console.log(req);
  const backend: string =
    process.env.NEXT_PUBLIC_BACKEND_URL + "url/full" || "";

  const fullurl = (await axios.post(backend, req)).data;
  // console.log(fullurl);
  return {
    revalidate: 1,
    props: { fullurl },
  };
};

const Links = ({ fullurl }: { fullurl: IParams }) => {
  const router = useRouter();

  useEffect(() => {
    if (router.isFallback) return;
    const destination = fullurl.url;
    if (destination) {
      const url = /^(https?:\/\/)/i.test(destination)
        ? destination
        : `https://${destination}`;
      window.location.href = url;
    }
  }, [router.isFallback, fullurl]);

  if (router.isFallback) {
    return <Loading />;
  }
  return null;
};

export default Links;

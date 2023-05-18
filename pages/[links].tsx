import React from "react";
import axios from "axios";
import { Url } from "@/types/url.type";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { redirect } from "next/navigation";
import { Router, useRouter } from "next/router";
import Loading from "@/components/loading";

interface IParams extends ParsedUrlQuery {
  link: string;
}
export const getStaticPaths: GetStaticPaths = async () => {
  const backend: string = process.env.NEXT_PUBLIC_BACKEND_URL + "url/all" || "";
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
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { links } = ctx.params as IParams;
  // console.log(ctx.params);
  // console.log(links);
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
    redirect: { destination: fullurl.url, permanent: false },
  };
  // return {
  //   props: { fullurl },
  // };
};

const Links = ({}) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />;
  }
  return null;
};

export default Links;

import * as React from "react";
import { Prisma, Post } from "@prisma/client";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import { prisma, getPosts } from "../db";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";

const IndexPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [postList, setPostList] = React.useState(props.posts);

  const addPost = async (e: React.FormEvent, formData: Post) => {
    e.preventDefault();
    const post = {
      id: Math.random(),
      title: formData.title,
      image: "someimageurl",
      body: formData.body,
    };
    setPostList([post, ...postList]);
  };

  const deletePost = async (id: number) => {
    const posts: Post[] = postList.filter((post: Post) => post.id !== id);
    console.log(posts);
    setPostList(posts);
  };

  if (!postList) return <h1>Loading...</h1>;

  return (
    <main className="container">
      <h1>My posts</h1>
      <AddPost savePost={addPost} />
      {postList.map((post: Post) => (
        <PostCard key={post.id} deletePost={deletePost} post={post} />
      ))}
    </main>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<{
  posts: Prisma.PromiseReturnType<typeof getPosts>;
}> = async () => {
  const posts = await prisma.post.findMany({});
  return { props: { posts } };
};

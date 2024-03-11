import { useEffect, useState, useRef } from "react";
import { getDocs, collection } from "firebase/firestore";
import { useTitle } from "../hooks/useTitle";
import { db } from "../firebase/config";
import { BlogPostCard, SkeletonCard} from "../components";

export const HomePage = () => {
  useTitle("Home");
  const [toggle, setToggle] = useState(false);
  const [posts, setPosts] = useState([]);
  const postsRef = useRef(collection(db, "posts"));
  useEffect(() => {
      async function getPosts(){
      const data = await getDocs(postsRef.current);
      setPosts(data.docs.map((document) => (
        {...document.data(), id: document.id}
        )
      ));
    }
    
    getPosts();
  }, [postsRef, toggle]);
  return (
    <section>
    { posts.map((post, index) => (
      post ? (
        <BlogPostCard key={post.id} post={post} toggle={toggle} setToggle={setToggle} />
      ) : (
        <SkeletonCard key={index} />
      )        
    )) }      
  </section>
  )
}
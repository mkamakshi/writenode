import {useRef} from "react";
import { useTitle } from "../hooks/useTitle";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  useTitle("Create Post");
  const navigate = useNavigate();
  const postRef = collection(db, "posts");
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  async function handleCreatePost(event){
    event.preventDefault();

    const document = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
    }
    await addDoc(postRef, document);
    navigate("/");
  }
    return (
      <section className="create">
        <div className="heading">
          <h1>Add New Post</h1>
        </div>
        <form className="createPost" onSubmit={handleCreatePost}>
          <input type="text" ref={titleRef} className="title" name="title" placeholder="Title" maxLength="50" required />
          <textarea type="text" ref={descriptionRef} className="description" name="description" placeholder="Description" maxLength="600" required ></textarea>
          <button type="submit" className="submit">Create</button>
        </form>
      </section>
    )
  }




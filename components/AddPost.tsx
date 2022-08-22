import * as React from "react";
import { IPost } from "../types";

type AddPostProps = {
  savePost: (e: React.FormEvent, formData: IPost) => void;
};

const initialState = {
  id: -1,
  title: "",
  body: "",
};

const AddPost: React.FC<AddPostProps> = ({ savePost }) => {
  const [formData, setFormData] = React.useState<IPost>(initialState);

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <form className="Form" onSubmit={(e) => savePost(e, formData)}>
      <div>
        <div className="Form--field">
          <label htmlFor="name">Title</label>
          <input onChange={handleForm} type="text" id="title" />
        </div>
        <div className="Form--field">
          <label htmlFor="body">Description</label>
          <input onChange={handleForm} type="text" id="body" />
        </div>
      </div>
      <button
        className="Form__button"
        disabled={formData === undefined ? true : false}
      >
        Add Post
      </button>
    </form>
  );
};
export default AddPost;

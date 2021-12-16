import { useState, useEffect } from "react";
import ListItem from "../list-item/ListItem";
import classes from "./TodoList.module.css";

function TodoList() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [inputImg, setInputImg] = useState();
  const [error, setError] = useState("");

  // fetch any existing post from localstorage
  useEffect(() => {
    const localStorageList = JSON.parse(localStorage.getItem("list") || []);
    if (localStorageList.length) {
      setList(localStorageList);
    }
  }, []);

  // to remove error text after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const updateList = (newList) => {
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  };

  const addPostHandler = () => {
    if (!input) return setError("Enter valid information");
    const item = {
      deleteMode: false,
      text: input,
      img: inputImg,
    };
    const newList = [...list, item];
    updateList(newList);
    setInput("");
    setInputImg(null);
  };

  const updatePostsHandler = () => {
    let newList = [...list];
    newList = newList.filter((item) => item.deleteMode === false);
    updateList(newList);
  };

  return (
    <div className={classes.wrapper}>
      <h1 style={{ marginBottom: "5px" }}>Add a post</h1>
      {error && <div className={classes.error}>{error}</div>}
      <div className={classes.inputContainer}>
        <textarea
          rows="4"
          type="text"
          placeholder="Enter a task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <h3 style={{ marginBottom: "10px" }}>Input an image:</h3>
        <div className={classes.imgInput}>
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) =>
              setInputImg(URL.createObjectURL(e.target.files[0]))
            }
          />
          {inputImg && <img src={inputImg} alt="input" />}
        </div>
        <button
          className={classes.button}
          onClick={addPostHandler}
          type="button"
        >
          Add Post
        </button>
      </div>
      <div className={classes.listGroup}>
        <div className={classes.topBar}>
          <h1>Things to do</h1>
          <button
            className={classes.updateButton}
            onClick={updatePostsHandler}
            type="button"
            disabled={list.filter((item) => item.deleteMode).length === 0}
          >
            Update tasks
          </button>
        </div>

        {list?.length ? (
          list?.map((item, index) => (
            <ListItem
              item={item}
              key={index}
              index={index}
              list={list}
              setList={setList}
              updateList={updateList}
            />
          ))
        ) : (
          <p>No items to do</p>
        )}
      </div>
    </div>
  );
}

export default TodoList;

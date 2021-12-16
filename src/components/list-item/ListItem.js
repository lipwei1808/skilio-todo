import { useEffect, useState } from "react";
import classes from "./ListItem.module.css";

function ListItem({ item, list, index, updateList }) {
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(item.deleteMode);
  const [editedText, setEditedText] = useState(item.text);

  useEffect(() => {
    setEditedText(item.text);
    setDeleteMode(item.deleteMode);
  }, [item]);

  useEffect(() => {
    const newList = [...list];
    newList[index].deleteMode = deleteMode;
    updateList(newList);
  }, [deleteMode]);

  const editPostHandler = () => {
    if (editMode) {
      setEditMode(false);
      const newList = [...list];
      newList[index].text = editedText;
      updateList(newList);
    } else {
      setEditMode(true);
    }
  };

  return (
    <div
      className={classes.item}
      style={editMode ? { backgroundColor: "#eee" } : null}
    >
      <div>
        <input
          checked={deleteMode}
          onChange={(e) => setDeleteMode(e.target.checked)}
          className={classes.checkbox}
          type="checkbox"
        />
      </div>
      {item.img && (
        <div>
          <img src={item.img} alt="preview" />
        </div>
      )}
      {!editMode && <div className={classes.text}>{item.text}</div>}
      {editMode && (
        <textarea
          rows="5"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className={classes.textarea}
        ></textarea>
      )}
      <button
        className={classes.actions}
        style={
          editMode
            ? { backgroundColor: "greenyellow" }
            : { backgroundColor: "aqua" }
        }
        onClick={editPostHandler}
        type="button"
      >
        {editMode ? "Save" : "Edit"}
      </button>
    </div>
  );
}

export default ListItem;

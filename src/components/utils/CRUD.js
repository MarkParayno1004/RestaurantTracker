import app from "../../firebase-config";
import {
  getDatabase,
  ref,
  update,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";

export const CreateMenu = ({
  category,
  nameRef,
  priceRef,
  costRef,
  stockRef,
  size,
  handleClose,
}) => {
  const db = getDatabase(app);
  const newDocRef = push(ref(db, "item/data"));
  set(newDocRef, {
    category: category,
    name: nameRef.current.value,
    price: priceRef.current.value,
    cost: costRef.current.value,
    stock: stockRef.current.value,
    size: size,
  })
    .then(() => {
      nameRef.current.value = "";
      priceRef.current.value = "";
      costRef.current.value = "";
      stockRef.current.value = "";
      handleClose();
    })
    .catch((error) => alert("Error:", error));
};

export const UpdateTableMenu = ({ dispatch }) => {
  const db = getDatabase(app);
  const dbRef = ref(db, "item/data");
  const unsubscribe = onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      dispatch({
        type: "SET_GET_ITEMS",
        payload: Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        })),
      });
    } else {
      dispatch({ type: "SET_GET_ITEMS", payload: [] });
    }
  });

  return () => unsubscribe();
};

export const EditMenu = ({
  setAuthEdit,
  setEditItemId,
  setEditData,
  currentItem,
}) => {
  setAuthEdit(true);
  setEditItemId(currentItem.id);
  setEditData(currentItem);
};

export const SaveEditedMenu = async ({
  editItemId,
  editData,
  setAuthEdit,
  setOpenConfirmationSave,
}) => {
  const db = getDatabase(app);
  const dbRef = ref(db, `item/data/${editItemId}`);
  await update(dbRef, editData);
  setAuthEdit(false);
  setOpenConfirmationSave(false);
};

export const DeleteMenu = async ({
  deleteItemId,
  setOpenDelete,
  setDeleteItemId,
}) => {
  const db = getDatabase(app);
  const dbRef = ref(db, `item/data/${deleteItemId}`);
  await remove(dbRef);
  setOpenDelete(false);
  setDeleteItemId(null);
};

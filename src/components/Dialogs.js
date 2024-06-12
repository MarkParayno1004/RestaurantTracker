import React from "react";
import ModalCreateMenu from "./ModalCreateMenu";
import AuthEdit from "./dialogs/AuthEdit";
import AuthSaveEdit from "./dialogs/AuthSaveValueEdit";
import AuthDelete from "./dialogs/AuthDelete";
import PropTypes from "prop-types";
import { SaveEditedMenu, DeleteMenu, EditMenu } from "./utils/CRUD";

export default function Dialogs({
  createMenu,
  openEditConfirmation,
  openConfirmationSave,
  openDelete,
  dispatch,
  editItemId,
  editData,
  currentItem,
  deleteItemId,
}) {
  return (
    <>
      {createMenu && (
        <ModalCreateMenu
          open={createMenu}
          handleClose={() =>
            dispatch({ type: "SET_CREATE_MENU", payload: !createMenu })
          }
        />
      )}
      {openEditConfirmation && (
        <AuthEdit
          handleOpen={openEditConfirmation}
          handleClose={() =>
            dispatch({ type: "SET_OPEN_EDIT_CONFIRMATION", payload: false })
          }
          updateDataConfirmed={(data) => {
            if (data) {
              if (currentItem) {
                EditMenu({
                  setAuthEdit: (value) =>
                    dispatch({ type: "SET_AUTH_EDIT", payload: value }),
                  setEditItemId: (id) =>
                    dispatch({ type: "SET_EDIT_ITEM_ID", payload: id }),
                  setEditData: (data) =>
                    dispatch({ type: "SET_EDIT_DATA", payload: data }),
                  currentItem,
                });
              }
            }
          }}
          item={currentItem}
        />
      )}

      {openConfirmationSave && (
        <AuthSaveEdit
          handleOpen={openConfirmationSave}
          handleClose={() =>
            dispatch({ type: "SET_OPEN_CONFIRMATION_SAVE", payload: false })
          }
          updateDataConfirmed={(data) => {
            if (data) {
              SaveEditedMenu({
                editItemId,
                editData,
                setAuthEdit: (value) =>
                  dispatch({ type: "SET_AUTH_EDIT", payload: value }),
                setOpenConfirmationSave: (value) =>
                  dispatch({
                    type: "SET_OPEN_CONFIRMATION_SAVE",
                    payload: value,
                  }),
              });
            }
          }}
        />
      )}
      {openDelete && (
        <AuthDelete
          handleOpen={openDelete}
          handleClose={() =>
            dispatch({ type: "SET_OPEN_DELETE", payload: false })
          }
          updateDataConfirmed={() =>
            DeleteMenu({
              deleteItemId,
              setOpenDelete: (value) =>
                dispatch({ type: "SET_OPEN_DELETE", payload: value }),
              setDeleteItemId: (id) =>
                dispatch({ type: "SET_DELETE_ITEM_ID", payload: id }),
            })
          }
        />
      )}
    </>
  );
}
Dialogs.propTypes = {
  createMenu: PropTypes.bool.isRequired,
  openEditConfirmation: PropTypes.bool.isRequired,
  openConfirmationSave: PropTypes.bool.isRequired,
  openDelete: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  editItemId: PropTypes.string.isRequired,
  editData: PropTypes.object.isRequired,
  currentItem: PropTypes.object.isRequired,
  deleteItemId: PropTypes.string.isRequired,
};

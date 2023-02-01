import React, { useEffect, useRef, useState } from 'react';
import styles from './Group.module.scss';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { useDeleteGroupMutation } from '../../../redux/api/group';
import Spinner from '../../layout/Spinner';
import { handleRTKQError } from '../../../helpers/error';
import EditGroupModal from '../../modals/EditGroupModal';

interface Props {
  id: number;
  title: string;
  category: { id: number; title: string };
}

const Group = ({ id, title, category }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteGroup, { isLoading: deleting, error: deleteError }] =
    useDeleteGroupMutation();

  const editStartHandler = () => {
    setEditMode(true);
  };

  const deleteHandler = () => {
    deleteGroup(id);
  };

  useEffect(() => {
    handleRTKQError(deleteError);
  }, [deleteError]);

  return (
    <li className={styles.group}>
      <button className={styles.button} onClick={() => setEditMode(true)}>
        <FaEdit />
      </button>
      <div className={styles.info}>
        <span>{title}</span>
        <span className={styles.category}>{category.title}</span>
      </div>
      <button className={styles.button} onClick={deleteHandler}>
        {deleting ? <Spinner inline /> : <FaTimes />}
      </button>
      {editMode && (
        <EditGroupModal
          onClose={() => setEditMode(false)}
          id={id}
          title={title}
          categoryId={category.id}
        />
      )}
    </li>
  );
};

export default Group;

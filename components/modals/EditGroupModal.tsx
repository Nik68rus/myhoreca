import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { handleRTKQError } from '../../helpers/error';
import { useGetCategoriesQuery } from '../../redux/api/category';
import { useEditGroupMutation } from '../../redux/api/group';
import { useCreateShopMutation } from '../../redux/api/shop';
import FormControl from '../forms/FormControl';
import Select from '../forms/Select';
import Spinner from '../layout/Spinner';
import Modal from './Modal';

type Props = {
  onClose: () => void;
  title: string;
  id: number;
  categoryId: number;
};

const EditGroupModal = ({ onClose, id, title, categoryId }: Props) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newCatId, setNewCatId] = useState(categoryId);

  const [editGroup, { isLoading, error, isSuccess }] = useEditGroupMutation();
  const {
    data: categories,
    isLoading: catLoading,
    error: catError,
  } = useGetCategoriesQuery();

  useEffect(() => {
    handleRTKQError(error);
    handleRTKQError(catError);
  }, [error, catError]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    editGroup({ id, title: newTitle, categoryId: newCatId });
  };

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setNewTitle(e.target.value);
    }, []);

  const catSelectHandler = useCallback(
    (cat: { id: number; title: string } | null) => {
      setNewCatId(cat?.id || categoryId);
    },
    [categoryId]
  );

  return (
    <>
      {isLoading && <Spinner />}
      <Modal onClose={onClose} heading="Редактирование группы">
        <div className="form">
          <form onSubmit={submitHandler}>
            <div className="form__group">
              <FormControl
                className="mb-8"
                label="Название"
                type="text"
                id="title"
                value={newTitle}
                onChange={inputChangeHandler}
                placeholder="Введите название"
                hint="Не менее 3 символов"
              />
              {categories && (
                <Select
                  className="mb-2"
                  items={categories}
                  label="Категория: "
                  onSelect={catSelectHandler}
                  selected={categoryId}
                />
              )}
            </div>
            <div className="form__actions mt-8">
              <button type="button" className="button" onClick={onClose}>
                Отмена
              </button>
              <button type="submit" className="button button--success">
                Редактировать
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditGroupModal;

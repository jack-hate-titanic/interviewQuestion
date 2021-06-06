import { useEffect, useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { getCategory, createCategory } from '@/services/api';
import styles from './index.less';
const { Option } = Select;
const AddCategory = props => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    queryCategory();
  }, []);

  const queryCategory = () => {
    getCategory().then(response => {
      setCategoryList(response);
    });
  };

  const onSubmitCategory = () => {
    createCategory({
      name: categoryName,
    }).finally(() => {
      setIsShowModal(false);
      queryCategory();
    });
  };

  const onSelectCategory = value => {
    const { setFetchParams, setReviewType } = props;
    const params = {
      categoryId: value === 'all' ? undefined : value,
    };
    setReviewType('more');
    setFetchParams(params);
  };

  return (
    <div className={styles.container}>
      <Select
        className={styles.select}
        defaultValue="all"
        onSelect={value => onSelectCategory(value)}
      >
        <Option value="all" key="all">
          全部
        </Option>
        {categoryList.map(item => {
          return (
            <Option value={item.id} key={item.name}>
              {item.name}
            </Option>
          );
        })}
      </Select>

      <Button
        type="primary"
        icon="plus"
        onClick={() => setIsShowModal(true)}
        className="leftComponentDistance"
      />
      <Modal
        visible={isShowModal}
        onCancel={() => setIsShowModal(false)}
        title="添加分类"
        onOk={onSubmitCategory}
        okText="确定"
        cancelText="取消"
      >
        <div className="label">类名:</div>
        <Input
          onChange={e => setCategoryName(e.target.value)}
          value={categoryName}
          style={{ width: 200 }}
        />
      </Modal>
    </div>
  );
};

export default AddCategory;

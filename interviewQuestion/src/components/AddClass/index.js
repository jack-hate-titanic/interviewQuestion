import { useEffect, useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { getClasses, createClass } from '@/services/api';
import styles from './index.less';
import { isObjectLike } from 'lodash';
import { getJsQuestion } from '../../services/api';
const { Option } = Select;
const AddClass = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [className, setClassName] = useState('');
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    getClass();
  }, []);

  const getClass = () => {
    getClasses().then(response => {
      setClassList(response);
    });
  };

  const onSubmitClass = () => {
    createClass({
      name: className,
    }).finally(() => {
      setIsShowModal(false);
    });
  };

  const onSelectClass = value => {
    const params = {
      classId: value,
    };
    getJsQuestion(params).then(response => console.log(response));
  };

  return (
    <div className={styles.container}>
      <Select className={styles.select} defaultValue="all" onSelect={value => onSelectClass(value)}>
        <Option value="all" key="all">
          全部
        </Option>
        {classList.map(item => {
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
        onOk={onSubmitClass}
        okText="确定"
        cancelText="取消"
      >
        <div className="label">类名:</div>
        <Input
          onChange={e => setClassName(e.target.value)}
          value={className}
          style={{ width: 200 }}
        />
      </Modal>
    </div>
  );
};

export default AddClass;

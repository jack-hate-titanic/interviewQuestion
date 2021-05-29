import { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { getClasses, createClass } from '@/services/api';

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

  return (
    <div>
      {classList.map(item => {
        return (
          <Button type="primary" key={item.name}>
            {item.name}
          </Button>
        );
      })}

      <Button
        type="primary"
        shape="circle"
        icon="plus"
        onClick={() => setIsShowModal(true)}
        className="leftDistance"
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

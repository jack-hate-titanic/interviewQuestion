import React, { PureComponent } from 'react';
import { Form, Modal, Input, message } from 'antd';
import * as api from '@/services/api';
import PropTypes from 'prop-types';
import BraftEditor from 'braft-editor';
import Editor from '@/components/Editor';
import _ from 'lodash';

const { TextArea } = Input;

@Form.create()
class AddInterviewQuestion extends PureComponent {
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      visible: false,
      editorState: BraftEditor.createEditorState(_.get(props, 'questionDetail.analysis', null)),
    };
  }

  static propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    operationType: PropTypes.string,
    questionDetail: PropTypes.object,
    getData: PropTypes.func,
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        visible: nextProps.visible,
      });
    }
  }

  onCreate = e => {
    const { operationType, getData, onCancel, questionDetail } = this.props;
    const { editorState } = this.state;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (operationType === 'add') {
          const html = editorState.toHTML();
          api
            .createJsQuestion({ ...values, analysis: html })
            .then(() => {
              message.success('添加成功');
              onCancel();
            })
            .catch(() => {
              onCancel();
            })
            .finally(() => {
              getData();
            });
        } else {
          api
            .updateJsQuestion({ ...values, id: questionDetail._id, analysis: html })
            .then(() => {
              message.success('修改成功');
              onCancel();
            })
            .catch(() => {
              onCancel();
            })
            .finally(() => {
              getData();
            });
        }
      }
    });
  };

  onChange = editorState => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, editorState } = this.state;
    const { onCancel, questionDetail, operationType } = this.props;

    return (
      <Modal
        visible={visible}
        title="创建试题"
        okText="提交"
        onCancel={onCancel}
        onOk={this.onCreate}
        cancelText="取消"
        destroyOnClose={true}
        width={1000}
      >
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator('title', {
              initialValue: operationType === 'add' ? '' : questionDetail.title,
              rules: [
                {
                  required: true,
                  message: '请输入试题名称!',
                },
              ],
            })(<Input placeholder="请输入试题名称" />)}
          </Form.Item>
          <Form.Item>
            <Editor onChange={this.onChange} editorState={editorState} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default AddInterviewQuestion;

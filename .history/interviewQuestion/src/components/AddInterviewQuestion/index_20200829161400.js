import React, { PureComponent } from 'react';
import { Form, Modal, Input, message } from 'antd';
import * as api from '@/services/api';
import PropTypes from 'prop-types';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import Editor from '@/components/Editor';
import _ from 'lodash';

const { TextArea } = Input;

@Form.create()
class AddInterviewQuestion extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props.operationType);
    const editorState =
      props.operationType === 'update'
        ? BraftEditor.createEditorState(_.get(props, 'questionDetail.analysis', null))
        : BraftEditor.createEditorState(null);
    this.state = {
      visible: false,
      editorState,
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

  // componentDidMount() {
  //   if (this.state.editorState.isEmpty()) {
  //     this.setState({
  //       editorState: ContentUtils.clear(this.state.editorState),
  //     });
  //   }
  // }

  onCreate = e => {
    const { operationType, getData, onCancel, questionDetail } = this.props;
    const { editorState } = this.state;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const html = editorState.toHTML();
        if (operationType === 'add') {
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
        <Form.Item>
          <Button style={{ marginRight: 24 }}>取消</Button>
          <Button style={{ marginRight: 24 }}>提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AddInterviewQuestion;

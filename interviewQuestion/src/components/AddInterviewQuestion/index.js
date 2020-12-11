import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import * as api from '@/services/api';
import BraftEditor from 'braft-editor';
import Editor from '@/components/Editor';
import _ from 'lodash';

const AddInterviewQuestion = props => {
  const { getFieldDecorator } = props.form;
  const { onCancel, questionDetail, operationType } = props;
  const editorState =
    props.operationType === 'update'
      ? BraftEditor.createEditorState(_.get(props, 'questionDetail.analysis', null))
      : BraftEditor.createEditorState(null);
  const [editor, setEditor] = useState(editorState);

  const onCreate = e => {
    const { operationType, getData, onCancel, questionDetail } = props;
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const html = editor.toHTML();
        if (operationType === 'add') {
          api
            .createJsQuestion({ ...values, analysis: html })
            .then(() => {
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
            .updateJsQuestion({ ...values, id: questionDetail.id, analysis: html })
            .then(response => {
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

  const onChange = editorState => {
    setEditor(editorState);
  };

  return (
    <Form className="login-form" onSubmit={onCreate}>
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
        <Editor onChange={onChange} editorState={editor} />
      </Form.Item>
      <Form.Item label={<span></span>} colon={false} style={{ textAlign: 'right' }}>
        <Button style={{ marginRight: 24 }} onClick={onCancel}>
          取消
        </Button>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create()(AddInterviewQuestion);

import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import * as api from '@/services/api';

import { Upload, Icon, Card, Button } from 'antd';
import _ from 'lodash';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = editorState => {
    const { onChange } = this.props;
    onChange && onChange(editorState);
  };

  uploadHandler = param => {
    if (!param.file) {
      return false;
    }
    const formData = new FormData();
    formData.append('file', param.file);
    const { onChange } = this.props;
    api.uploadFile(formData).then(response => {
      debugger;
      const imgContent = ContentUtils.insertMedias(this.props.editorState, [
        {
          type: 'IMAGE',
          url: _.get(response, 'url'),
        },
      ]);
      onChange && onChange(imgContent);
    });
  };

  render() {
    const controls = [
      'bold',
      'italic',
      'underline',
      'text-color',
      'separator',
      'link',
      'separator',
    ];
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload accept="image/*" showUploadList={false} customRequest={this.uploadHandler}>
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              <Icon type="picture" theme="filled" />
            </button>
          </Upload>
        ),
      },
    ];

    return (
      <BraftEditor
        value={this.props.editorState}
        onChange={this.handleChange}
        controls={controls}
        extendControls={extendControls}
      />
    );
  }
}

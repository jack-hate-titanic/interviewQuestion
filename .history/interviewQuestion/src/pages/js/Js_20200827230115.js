import React, { PureComponent } from 'react';
import { Button, Card, message, PageHeader, Icon, Tooltip, Popconfirm, Table } from 'antd';
import AddInterviewQuestion from '@/components/AddInterviewQuestion';
import * as api from '../../services/api';
import NoMoreQuestion from '@/components/NoMoreQuestion';
import _ from 'lodash';

export default class Js extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      questions: [],
      num: 0,
      operationType: 'add',
      reviewType: 'single',
      answerVisible: false,
    };
    this.columns = [
      {
        title: '序号',
        dataIndex: 'num',
        key: 'num',
        width: '15%',
        render: (text, record, index) => {
          return index + 1;
        },
      },
      {
        title: '试题名称',
        dataIndex: 'title',
        key: 'title',
        render: (text, record, index) => {
          return (
            <a
              href="javascript:;"
              onClick={() => {
                this.onQuestionDetail(index);
              }}
            >
              {text}
            </a>
          );
        },
      },
    ];
  }

  componentDidMount() {
    this.getData();
  }

  onQuestionDetail = num => {
    this.setState({
      reviewType: 'single',
      num: num,
    });
  };

  getData = () => {
    api.getJsQuestion().then(response => {
      this.setState({
        questions: response,
      });
    });
  };

  addQuestion = () => {
    this.setState({
      visible: true,
      operationType: 'add',
    });
  };

  deleteQuestion = () => {
    const { num, questions } = this.state;
    const deleteId = _.get(questions, `[${num}]._id`);
    api
      .destroyJsQuestion({
        id: deleteId,
      })
      .then(() => {
        message.success('删除成功');
        const newQuestions = questions.filter(question => question._id !== deleteId);
        this.setState(
          {
            questions: newQuestions,
          },
          () => {
            if (num > 0) {
              this.setState({
                num: num - 1,
              });
            } else {
              this.setState({
                num: num,
              });
            }
          },
        );
      });
  };

  onReviewQuestionType = () => {
    const { reviewType } = this.state;
    this.setState({
      reviewType: reviewType === 'all' ? 'single' : 'all',
    });
  };

  updateQuestion = () => {
    this.setState({
      visible: true,
      operationType: 'update',
    });
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  toNumOne = () => {
    this.setState({
      num: 0,
    });
  };

  onChangeAnswerVisible = () => {
    const { answerVisible } = this.state;
    this.setState({
      answerVisible: !answerVisible,
    });
  };

  render() {
    const { visible, questions, num, operationType, reviewType, answerVisible } = this.state;
    return (
      <div>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
            background: 'white',
          }}
          title={
            <div>
              汉语言文学试题
              <Button type="primary" style={{ marginLeft: 24 }} onClick={this.onReviewQuestionType}>
                {reviewType === 'all' ? '单个试题' : '试题总览'}
              </Button>
            </div>
          }
          extra={
            <Button type="primary" onClick={this.addQuestion}>
              添加试题
            </Button>
          }
        />

        <Card style={{ margin: 12, overflow: 'hidden' }}>
          {reviewType === 'single' ? (
            <div>
              {questions[num] ? (
                <div>
                  <p>
                    <span>{num + 1}.</span>
                    {questions[num].title}
                  </p>
                  {answerVisible ? (
                    <p>
                      解析：
                      <div dangerouslySetInnerHTML={{ __html: questions[num].analysis }} />
                    </p>
                  ) : null}

                  <div style={{ float: 'right' }}>
                    <Button
                      type="primary"
                      onClick={this.onChangeAnswerVisible}
                      style={{ marginRight: 24 }}
                    >
                      显示
                    </Button>
                    {num > 0 ? (
                      <Tooltip title="上一题">
                        <Button
                          type="primary"
                          className="rightComponentDistance"
                          onClick={() => {
                            this.setState({ num: num - 1, answerVisible: false });
                          }}
                        >
                          <Icon type="left" />
                        </Button>
                      </Tooltip>
                    ) : null}
                    <Popconfirm
                      title={'确定删除么?'}
                      okText={'确定'}
                      cancelText={'取消'}
                      onConfirm={this.deleteQuestion}
                    >
                      <Tooltip title="删除">
                        <Button className="rightComponentDistance" type="danger">
                          <Icon type="delete" />
                        </Button>
                      </Tooltip>
                    </Popconfirm>
                    <Tooltip title="编辑">
                      <Button
                        onClick={this.updateQuestion}
                        className="rightComponentDistance"
                        type="primary"
                      >
                        <Icon type="edit" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="下一题">
                      <Button
                        type="primary"
                        onClick={() => {
                          this.setState({ num: num + 1, answerVisible: false });
                        }}
                      >
                        <Icon type="right" />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              ) : (
                <NoMoreQuestion toNumOne={this.toNumOne} />
              )}
            </div>
          ) : (
            <div>
              <Table
                dataSource={questions}
                columns={this.columns}
                bordered={true}
                size="small"
                pagination={false}
              />
            </div>
          )}
        </Card>
        <AddInterviewQuestion
          visible={visible}
          onCancel={this.onCancel}
          operationType={operationType}
          getData={this.getData}
          questionDetail={_.get(questions, `[${num}]`, {})}
        />
      </div>
    );
  }
}

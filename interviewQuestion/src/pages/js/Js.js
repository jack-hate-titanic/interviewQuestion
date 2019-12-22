import React, { PureComponent } from 'react';
import { Button, Card, message, PageHeader } from 'antd';
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
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    api.getJsQuestion().then((response) => {
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
    api.destroyJsQuestion({
      id: deleteId,
    })
      .then(() => {
        message.info('删除成功');
        const newQuestions = questions.filter(question => question._id !== deleteId);
        this.setState({
          questions: newQuestions,
        }, () => {
          if (num > 0) {
            this.setState({
              num: num - 1,
            });
          } else {
            this.setState({
              num: num,
            });
          }
        });

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

  render() {
    const { visible, questions, num, operationType } = this.state;
    return (
      <div>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
            background: 'white',
          }}
          title="js面试题"
          extra={
            <Button type='primary' onClick={this.addQuestion}>添加试题</Button>
          }
        />
        <Card style={{ margin: 24 }}>
          {
            questions[num] ? (
              <div>
                <p>
                  <span>{num + 1}.</span>
                  {questions[num].title}
                </p>
                <p>
                  解析：{questions[num].analysis}
                </p>
                <div
                  style={{ float: 'right' }}>

                  <Button
                    onClick={this.deleteQuestion}
                    className='rightDistance'
                    type='danger'>
                    删除
                  </Button>
                  <Button
                    onClick={this.updateQuestion}
                    className='rightDistance'
                    type='primary'>
                    修改
                  </Button>
                  <Button
                    type='primary'
                    onClick={() => {
                      this.setState({ num: num + 1 });
                    }}
                  >
                    下一题
                  </Button>
                </div>

              </div>
            ) : (
              <NoMoreQuestion toNumOne={this.toNumOne}/>
            )
          }

        </Card>
        <AddInterviewQuestion
          visible={visible}
          onCancel={this.onCancel}
          operationType={operationType}
          getData={this.getData}
          questionDetail={_.get(questions, `[${num}]`, {})}/>
      </div>
    );
  }
}

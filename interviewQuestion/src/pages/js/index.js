import React, { useState, useEffect } from 'react';
import { Button, Card, PageHeader, Icon, Tooltip, Popconfirm, Table, Modal } from 'antd';
import AddInterviewQuestion from '@/components/AddInterviewQuestion';
import * as api from '../../services/api';
import NoMoreQuestion from '@/components/NoMoreQuestion';
import AddClass from '@/components/AddClass';
import { get } from 'lodash';
import styles from './index.less';

const Js = () => {
  const [visible, setVisible] = useState(false);
  const [questions, setQuestion] = useState([]);
  const [num, setNum] = useState(0);
  const [operationType, setOperationType] = useState('add');
  const [reviewType, setReviewType] = useState('more');
  const [answerVisible, setAnswerVisible] = useState(false);
  const [questionCount, setQuestionCount] = useState();
  const [fetchParams, setFetchParams] = useState({});

  const columns = [
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
            onClick={() => {
              setReviewType('single');
              setNum(index);
            }}
          >
            {text}
          </a>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData(fetchParams);
  }, [fetchParams]);

  const getData = () => {
    api.getJsQuestion(fetchParams).then(response => {
      setQuestion(response?.rows);
      setQuestionCount(response?.count);
    });
  };

  const deleteQuestion = () => {
    const deleteId = get(questions, `[${num}].id`);
    api
      .destroyJsQuestion({
        id: deleteId,
      })
      .then(async () => {
        const newQuestions = questions.filter(question => question.id !== deleteId);
        await setQuestion(newQuestions);
        if (num > 0) {
          setNum(num - 1);
        } else {
          setNum(num);
        }
      });
  };

  return (
    <div>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
          background: 'white',
        }}
        title={
          <div>
            <span className={styles.title}>前端面试题</span>
            <AddClass
              setFetchParams={params => setFetchParams({ ...fetchParams, ...params })}
              setReviewType={setReviewType}
            />
          </div>
        }
        extra={
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
              setOperationType('add');
            }}
          >
            添加试题
          </Button>
        }
      />

      <Card style={{ margin: 12, overflow: 'hidden' }}>
        <div className="bottomDistance">
          本类别一共有试题<span className={styles.questionCount}>{questionCount}</span>道
        </div>
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
                    onClick={() => setAnswerVisible(!answerVisible)}
                    style={{ marginRight: 24 }}
                  >
                    {answerVisible ? '隐藏' : '显示'}
                  </Button>
                  {num > 0 ? (
                    <Tooltip title="上一题">
                      <Button
                        type="primary"
                        className="rightComponentDistance"
                        onClick={() => {
                          setNum(num - 1);
                          setAnswerVisible(false);
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
                    onConfirm={deleteQuestion}
                  >
                    <Tooltip title="删除">
                      <Button className="rightComponentDistance" type="danger">
                        <Icon type="delete" />
                      </Button>
                    </Tooltip>
                  </Popconfirm>
                  <Tooltip title="编辑">
                    <Button
                      onClick={() => {
                        setVisible(true);
                        setOperationType('update');
                      }}
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
                        setNum(num + 1);
                        setAnswerVisible(false);
                      }}
                    >
                      <Icon type="right" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            ) : (
              <NoMoreQuestion toNumOne={() => setNum(0)} />
            )}
          </div>
        ) : (
          <div>
            <Table
              dataSource={questions}
              columns={columns}
              bordered={true}
              size="small"
              pagination={false}
              rowKey="id"
            />
          </div>
        )}
      </Card>
      <Modal
        visible={visible}
        title="创建试题"
        destroyOnClose={true}
        width={1000}
        footer={false}
        onCancel={() => setVisible(false)}
      >
        <AddInterviewQuestion
          onCancel={() => setVisible(false)}
          operationType={operationType}
          getData={getData}
          key={get(questions, `[${num}].id`, {})}
          questionDetail={get(questions, `[${num}]`, {})}
        />
      </Modal>
    </div>
  );
};

export default Js;

import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form, Spin, Divider, Button, Comment, Icon, Tooltip, Input, Avatar, message } from 'antd';

const TextArea = Input.TextArea;

@connect(({ doc, loading }) => ({
  doc,
  fetchLoading: loading.effects['doc/fetchComment'],
  addCommentLoading: loading.effects['doc/addComment'],
}))
class ArtivleComment extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      likes: 0,
      dislikes: 0,
      action: null,
      commentContent: '',
    };
  }

  componentDidMount() {
    const { dispatch, id, createUserCode, createUserName } = this.props;
    dispatch({
      type: 'doc/fetchComment',
      payload: {
        id,
        createUserCode,
        createUserName,
      },
    });
  }

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  };

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
  };

  handleChange = e => {
    this.setState({
      commentContent: e.target.value,
    });
  };

  handleSubmit = () => {
    const { commentContent } = this.state;
    const { docId, createUserCode, createUserName } = this.props;
    const { dispatch } = this.props;
    if (!commentContent) {
      message.error('请输入内容');
      return false;
    }

    /**
     * 还未对评论和回复做区别?
     */
    dispatch({
      type: 'doc/addComment',
      payload: {
        docId,
        content: commentContent,
        createUserCode,
        createUserName,
      },
    });
    return true;
  };

  render() {
    const { likes, dislikes, action, commentContent } = this.state;
    const {
      doc: { articleComment = [] },
      fetchLoading,
      addCommentLoading,
    } = this.props;
    // const Editor = ({ onChange, onSubmitComment, submitting, value }) => (
    //   <div>
    //     {/* <p>陈晓斌</p> */}
    //     <Form.Item style={{ marginBottom: 10 }}>
    //       <TextArea placeholder="少发段子，多发知识" rows={4} onChange={onChange} value={value} />
    //     </Form.Item>
    //     <Form.Item>
    //       <Button loading={submitting} onClick={onSubmitComment} type="primary">
    //         评论
    //       </Button>
    //     </Form.Item>
    //   </div>
    // );
    const actions = [
      <span>
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={action === 'liked' ? 'filled' : 'outlined'}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
      </span>,
      <span>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={action === 'disliked' ? 'filled' : 'outlined'}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
      </span>,
      <span>回复</span>,
    ];
    return (
      <>
        <Divider orientation="left">{articleComment.length}条评论</Divider>
        {fetchLoading ? (
          <Spin />
        ) : (
          articleComment.map(item => (
            <Comment
              key={item.id}
              actions={actions}
              author={<a>{item.createUserName}</a>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={<p>{item.content}</p>}
              datetime={
                <Tooltip title={moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment().fromNow()}</span>
                </Tooltip>
              }
            />
          ))
        )}

        {/* 添加评论 */}
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            // <Editor
            //   value={commentContent}
            //   onChange={this.handleChange}
            //   onSubmit={this.handleSubmit}
            //   submitting={addCommentLoading}
            // />
            <>
              <Form.Item style={{ marginBottom: 10 }}>
                <TextArea
                  placeholder="少发段子，多发知识"
                  rows={4}
                  onChange={this.handleChange}
                  value={commentContent}
                />
              </Form.Item>
              <Form.Item>
                <Button loading={addCommentLoading} onClick={this.handleSubmit} type="primary">
                  评论
                </Button>
              </Form.Item>
            </>
          }
        />
      </>
    );
  }
}
const WrapperArtivleCommentForm = Form.create({ name: 'ArtivleCommentForm' })(ArtivleComment);
export default WrapperArtivleCommentForm;

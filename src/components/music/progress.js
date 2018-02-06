import React from 'react';

let duration = null;
let progress = null;

let Progress = React.createClass({
  /**
   * 初始化方法
   * @returns {{progress: string}}
   */
  getInitialState() {
    return {
      progress: '-'
    }
  },

  /**
   * 生命周期：componentDidMount
   */
  componentDidMount() {
    $('#player').jPlayer({
      ready: function () {
        $(this).jPlayer('setMedia', {
          mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
        }).jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute
      });
    });
  },

  /**
   * 生命周期：componentWillUnmount
   */
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  },

  /**
   * 鼠标点击进度条，改变播放进度
   * @param e
   */
  changeProgress(e) {
    let progressBar = this.refs.progressBar;
    progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    this.props.onProgressChange && this.props.onProgressChange(progress);
    $('#player').jPlayer('play', duration * progress);
  },

  /**
   * render 方法
   */
  render() {
    return (
      <div className="components_progress" ref="progressBar" onClick={this.changeProgress} >
        <div className="progress" style={{width: `${this.state.progress}%`}} ></div>
        {/*{ this.state.progress }s*/}
      </div>
    );
  }

});

export default Progress;

import React from 'react';
import Progress from './progress';
import {MUSIC_LIST} from '../../data/musicDatas';

let PubSub = require('pubsub-js');
require('./player.less');

let duration = null;

let Player = React.createClass({

  /**
   * 生命周期方法 componentDidMount
   */
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
      });
    });

    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playNext();
    });
  },

  /**
   * 生命周期方法 componentWillUnmount
   */
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  },

  formatTime(time) {
    time = Math.floor(time);
    let miniute = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds);
  },

  /**
   * 进度条被拖动的处理方法
   * @param progress
   */
  changeProgressHandler(progress) {
    $('#player').jPlayer('play', duration * progress);
    this.setState({
      isPlay: true
    });

    // 获取转圈的封面图片
    let imgAnimation = this.refs.imgAnimation;
    imgAnimation.style = 'animation-play-state: running';
  },

  /**
   * 音量条被拖动的处理方法
   * @param progress
   */
  changeVolumeHandler(progress) {
    $('#player').jPlayer('volume', progress);
  },

  /**
   * 播放或者暂停方法
   **/
  play() {
    this.setState({
      isPlay: !this.state.isPlay
    });

    // 获取转圈的封面图片
    var imgAnimation = this.refs.imgAnimation;

    if (this.state.isPlay) {
      $('#player').jPlayer('pause');
      imgAnimation.style = 'animation-play-state: paused';
    } else {
      $('#player').jPlayer('play');
      imgAnimation.style = 'animation-play-state: running';
    }

  },

  /**
   * 下一首
   **/
  next() {
    PubSub.publish('PLAY_NEXT');

    this.setState({
      isPlay: true
    });

    // 开始播放下一首
    this.playNext();

    // 获取转圈的封面图片
    let imgAnimation = this.refs.imgAnimation;
    imgAnimation.style = 'animation-play-state: running';

  },

  /**
   * 上一首
   **/
  prev() {
    PubSub.publish('PLAY_PREV');

    this.setState({
      isPlay: true
    });

    // 开始播放上一首
    this.playNext('prev');

    // 获取转圈的封面图片
    let imgAnimation = this.refs.imgAnimation;
    imgAnimation.style = 'animation-play-state: running';

  },

  playNext(type = 'next') {
    let index = this.findMusicIndex(this.state.currentMusitItem);
    if (type === 'next') {
      index = (index + 1) % this.state.musicList.length;
    } else {
      index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
    }
    let musicItem = this.state.musicList[index];
    this.setState({
      currentMusitItem: musicItem
    });
    this.playMusic(musicItem);
  },

  playMusic(item) {
    $('#player').jPlayer('setMedia', {
      mp3: item.file
    }).jPlayer('play');
    this.setState({
      currentMusitItem: item
    });
  },

  findMusicIndex(music) {
    let index = this.state.musicList.indexOf(music);
    return Math.max(0, index);
  },

  changeRepeat() {
    PubSub.publish('CHANAGE_REPEAT');
  },

  // constructor() {
  //   return {
  //     progress: 0,
  //     volume: 0,
  //     isPlay: true,
  //     leftTime: ''
  //   }
  // },

  componentWillMount() {
    this.getInitialState();
  },

  getInitialState() {
    return {
      musicList: MUSIC_LIST,
      currentMusitItem: MUSIC_LIST[0],
      repeatType: 'cycle',

      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime: ''
    }
  },

  /**
   * render 渲染方法
   * @returns {*}
   */
  render() {
    return (
      <div className="player-page">
        <div className=" row">
          <div className="controll-wrapper">
            <h2 className="music-title">{this.state.currentMusitItem.title}</h2>
            <h3 className="music-artist mt10">{this.state.currentMusitItem.artist}</h3>
            <div className="row mt10">
              <div className="left-time -col-auto">-{this.state.leftTime}</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                <div className="volume-wrapper">

                  {/* 音量条 */}
                  <Progress
                    progress={this.state.volume}
                    onProgressChange={this.changeVolumeHandler}
                    // barColor='#aaa'
                  >
                  </Progress>
                </div>
              </div>
            </div>
            <div style={{height: 10, lineHeight: '10px'}}>

              {/* 播放进度条 */}
              <Progress
                progress={this.state.progress}
                onProgressChange={this.changeProgressHandler}
              >
              </Progress>
            </div>
            <div className="mt35 row">
              <div>
                <i className="icon prev" onClick={this.prev}></i>
                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
                <i className="icon next ml20" onClick={this.next}></i>
              </div>
              <div className="-col-auto">
                {/* 播放模式按钮：单曲、循环、随机 */}
                <i className={`repeat-${this.state.repeatType}`} onClick={this.changeRepeat}></i>
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img ref="imgAnimation" src={this.state.currentMusitItem.cover} alt={this.state.currentMusitItem.title}/>
          </div>
        </div>
      </div>
    );
  }
});

export default Player;

import React from 'react';

let Play = React.createClass({

  /**
   * render 方法
   */
  render() {
    let item = this.state.currentItem;

    const btnStyle = {
      cursor: "pointer",
    };

    return (
      <div ref="zone" className="mt20 row">

        {/* 除了转圈的封面以外 start */}
        <div className="controll-wrapper">
          <h2 className={styles.musicTitle}>{item.title}</h2>
          <h3 className={`${styles.musicArtist} mt10`}>{item.artist}</h3>
          <div className="row mt20">
            <div className={`${styles.leftTime} -col-auto`}>-{this.state.leftTime}</div>
            <div className={styles.volumeContainer}>
              <i className="icon-volume rt" style={{top: 5, left: -5}}/>
              <div className={styles.volumeWrapper}>
                <Progress progress={this.state.volume} barColor="#aaa"
                          onProgressChange={this.changeVolumeProgress}
                />
              </div>
            </div>
          </div>
          <div style={{height: 10, lineHeight: '10px', marginTop: '8px'}}>
            <Progress progress={this.state.progress}
                      onProgressChange={this.changeMusicProgress}
            />
          </div>
          <div className="row" style={{marginTop: '35px'}}>
            <div>
              {/* 上一首 */}
              <i className="icon prev" style={btnStyle}
                 onClick={() => this.prev()}/>
              {/* 播放 或 暂停 按钮 */}
              <i className={`icon ml35 ${this.state.isPlay ? 'pause' : 'play'}`} style={btnStyle}
                 onClick={() => this.pause()}
              />
              {/* 下一首 */}
              <i className="icon next ml35" style={btnStyle} onClick={() => this.next()}/>
            </div>
            <div className="-col-auto">
              <i className={`icon repeat-${this.state.repeatType}`}
                 onClick={() => this.playType()}/>
            </div>
          </div>
        </div>
        {/* 除了转圈的封面以外 end */}

        {/* 转圈的封面 start */}
        <div className={`-col-auto ${styles.cover}`}>
          <img ref="imgAnimation" className={styles.musicImg} src={item.cover} alt={item.title}/>
        </div>
        {/* 转圈的封面 end */}

      </div>
    )
  }
});

import React from 'react';
import { connect } from 'react-redux';

import { padNum } from 'helpers';

const CountDownTimer = (props) => {
  let { countdown } = props;
  let millisecs = countdown;
  let days = Math.floor(millisecs/(1000*60*60*24));
  millisecs = (millisecs - (days*(1000*60*60*24)));
  let hours = Math.floor(millisecs/(1000*60*60));
  millisecs = (millisecs - (hours*(1000*60*60)));
  let mins = Math.floor(millisecs/(1000*60));
  millisecs = millisecs - (mins*(1000*60));
  let secs = Math.floor(millisecs/1000);
  millisecs = millisecs - (mins*1000);

  // console.log(millisecs < 1000);

  // console.log(countdown);

  let time = props.paddedTime ? 
    `${ padNum(days,2)}:${padNum(hours,2)}:${padNum(mins,2)}:${padNum(secs,2)}` 
    : `${ days }.${ hours }.${ padNum(mins,2) }.${ padNum(secs,2) }`;

  return (
    <div className={ `countdown-timer ${props.className ? props.className : '' }` }>
      { time }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    countdown: state.engineState ? state.engineState.countdown : 0
  }
}

export default connect(mapStateToProps)(CountDownTimer);
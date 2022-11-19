import './App.css';
import Box from '@mui/material/Box';
import React from 'react';


class App extends React.Component {
constructor(props){
super(props)
this.state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentSess: 'Session',
    timerState: 'pause',
    interval: undefined
}
this.audioBeep = React.createRef();
this.time = this.time.bind(this) 
this.reset =this.reset.bind(this)
this.playPause =this.playPause.bind(this)
this.increaseSess =this.increaseSess.bind(this)
this.decreaseSess =this.decreaseSess.bind(this)
this.increaseBrk =this.increaseBrk.bind(this)
this.decreaseBrk=this.decreaseBrk.bind(this)

}
 
time =(count) =>{ 
  if (count< 0) return "00:00";
  let minutes = Math.floor(count/ 60);
  let seconds = count - minutes * 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return minutes + ':' + seconds;
}
reset =() =>{
  this.setState({
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentSess: 'Session',
    timerState: 'pause',
    interval: undefined
  })
  clearInterval(this.interval)
  this.audioBeep.pause()
  this.audioBeep.currentTime = 0;
}


playPause =()=>{
  if (this.state.timerState === 'play'){
    clearInterval(this.interval)
    this.setState({
      timerState: 'pause'
    })
  }
  else{
    this.setState({
        timerState: 'play',
    })

    this.interval = setInterval(() => { 
        if((this.state.clockCount) === 0){
          this.audioBeep.play()
          this.setState({
            currentSess: (this.state.currentSess ==='Session')? 'Break' : 'Session',
            clockCount: (this.state.currentSess === 'Session') ? (this.state.breakCount * 60)  : (this.state.sessionCount * 60) 
          })
        }
        else{
          this.setState({
            clockCount: this.state.clockCount -1
          })
        }
    },1000);
    }

}

componentWillUnmount() {
  clearInterval(this.interval);
  
 }


 increaseSess=()=>{
  if (this.state.sessionCount <60){
    if (this.state.currentSess === "Session" && this.state.timerState === 'pause'){
      this.setState({
        clockCount: (this.state.sessionCount + 1) * 60,
        sessionCount: this.state.sessionCount + 1 
      }) 
    }
    else{
      this.setState({
        sessionCount: this.state.sessionCount +1
      })
    }
   }
  }

  increaseBrk=()=>{
    if (this.state.breakCount <60){
      if (this.state.currentSess === "Break" && this.state.timerState === 'pause'){
        this.setState({
          clockCount: (this.state.breakCount + 1) * 60,
          breakCount: this.state.breakCount + 1 
        }) 
      }
      else{
        this.setState({
          breakCount: this.state.breakCount +1
        })
      }
     }
    }

    decreaseBrk=()=>{
      if (this.state.breakCount > 1){
        if (this.state.currentSess === "Break" && this.state.timerState === 'pause'){
          this.setState({
            clockCount: (this.state.breakCount - 1) * 60,
            breakCount: this.state.breakCount - 1 
          }) 
        }
        else{
          this.setState({
            breakCount: this.state.breakCount -1
          })
        }
       }
      }
  
 decreaseSess=()=>{ 
  if (this.state.sessionCount >1 ){
    if (this.state.currentSess === "Session" && this.state.timerState === 'pause'){
      this.setState({
        clockCount: (this.state.sessionCount - 1) * 60,
        sessionCount: this.state.sessionCount - 1 
      }) 
    }
    else{
      this.setState({
        sessionCount: this.state.sessionCount -1
      })
    }
  } 
    }

 render(){
  return (
    <>  
    <div className='clock'>
    <div id="break-label">
       <h3 style={{padding: '1em'}}>Break Length</h3>
       <div id='break-length'>
         <Box sx={{ width: 200, height: 50, backgroundColor: 'black', opacity: [0.9, 0.8, 0.7], display: 'grid', placeContent:'center'}}>
         <p style={{color: 'white'}}> {this.state.breakCount}</p>
         </Box> 
       </div>
       <div className='btns'>
       <button type='button' id='break-increment' onClick={this.increaseBrk}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
              </svg>
       </button>
          
       <button type= 'button' id='break-decrement' onClick={this.decreaseBrk}>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
           </svg>
       </button>
       </div>
     </div>
 
     <div id='session-label'>
       <h3 style={{padding: '1em'}}>Session Length</h3>
       <div id='session-length'>
         <Box sx={{ width: 200, height: 50, backgroundColor: 'black', opacity: [0.9, 0.8, 0.7], display: 'grid', placeContent:'center'}}>
         <p style={{color: 'white'}}>{this.state.sessionCount}</p>
         </Box> 
       </div>
 
       <div className='btns'>
         <button type='button' id='session-increment' onClick={this.increaseSess}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
             </svg>
         </button>
         <button type='button' id='session-decrement'onClick={this.decreaseSess}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
             </svg>
         </button>
       </div>
     </div>
  
     <div id='timer-label'>
       <h3 style={{padding: '1em'}}>{this.state.currentSess}</h3>
       <div className='time-left'>
         <Box sx={{ width: 300, height: 80, backgroundColor: 'black', opacity: [0.9, 0.8, 0.7], display: 'grid', placeContent:'center'}}>
         <p style={{color: 'white'}} id='time-left'>{this.time(this.state.clockCount)}</p>
         </Box> 
       </div>
       <div className='btns'>
         <button id='start_stop' onClick={this.playPause}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" />
             </svg>
         </button>
         <button id='reset' onClick={this.reset}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
             </svg>
         </button>
       </div>
     </div>
 
    </div>
      <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
  
    </> 
   );
 }
}

export default App;

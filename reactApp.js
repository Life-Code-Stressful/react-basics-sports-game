// Thanks from Davey Stru helped lot for better unstanading all.
https://my.kenzie.academy/courses/86/assignments/10216?module_item_id=14155
class Team extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            shots: 0,
            score: 0
        }
        this.shotSound = new Audio('./Sounds/shots.mp3')
        this.scoreSound = new Audio('./Sounds/score.mp3')
    }

    shotHandler = () => {
        let score = this.state.score
        this.shotSound.play()

        if (Math.random() > 0.5){
            score += 1
            this.scoreSound.play()
        }

        this.setState((state, props) => ({
          shots: state.shots + 1,
          score
        }))
      }

    render(){
        let shotPercentageDiv
        if(this.state.shots){
        const shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
        shotPercentageDiv = (
            <div>
                <strong>Persentage %: {shotPercentage}</strong>
            </div>

        )
    }
        return(
            <div className="Team">
                <h2>{this.props.name}</h2>

                <div className="identity">
                    <img src={this.props.logo} alt={this.props.name} />
                </div>

                <div>
                    <strong>Shots:</strong>{this.state.shots}
                </div>

                <div>
                    <strong>Score:</strong>{this.state.score}
                </div>

                {shotPercentageDiv}

                <button onClick={this.shotHandler}>Shoot!</button>
            </div>

        )
    }
}

function Game (props){
    return(
        <div className="Game">
            <h1>Welcome To {props.venue}</h1>
            <div className="stats">
               <Team 
                  name= {props.visitingTeam.name} 
                  logo= {props.visitingTeam.logoSrc}
                />

               <div className="versus">
                 <h1>VS</h1>
            </div>
               <Team 
                  name= {props.homeTeam.name} 
                  logo= {props.homeTeam.logoSrc}
                />
            </div>
        </div>
    )
}





function App (props) {
    const afm ={
        name: 'We Are All Bowlers',
        logoSrc: './Images/AMF.png'
    }

    const kingPins = {
        name: 'King Pins',
        logoSrc: './Images/kingpins.png'
    }

    const olympiaLanes = {
        name: 'Olympia Lanes',
        logoSrc: './Images/Olympia Lanes.png'
    }

    const stardusBowl = {
        name: 'Stardus Bowl lll',
        logoSrc: './Images/Stardus Bowl lll.png'
    }
    return (
      <div className="App">
          <Game 
          venue="Bowling Night Game Pizza and Beer"
          homeTeam = {afm}
          visitingTeam={kingPins}
          />
          <Game 
          venue="Bowling Day Game burgers and Soda" 
          homeTeam={olympiaLanes}
          visitingTeam={stardusBowl}
          />
      </div>
    )
  }
  
  
  
  
  // Render the App
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
  
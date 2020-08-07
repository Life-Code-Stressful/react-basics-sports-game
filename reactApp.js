//Davey is the best
function Team(props) {
  let shotPercentageDiv;

  if (props.stats.shots) {
    const shotPercentage = Math.round(
      (props.stats.score / props.stats.shots) * 100
    );
    shotPercentageDiv = (
      <div>
        <strong>Persentage %: {shotPercentage}</strong>
      </div>
    );
  }
  return (
    <div className="Team">
      <h2>{props.name}</h2>

      <div className="identity">
        <img src={props.logo} alt={props.name} />
      </div>

      <div>
        <strong>Shots:</strong>
        {props.stats.shots}
      </div>

      <div>
        <strong>Score:</strong>
        {props.stats.score}
      </div>

      {shotPercentageDiv}

      <button onClick={props.shotHandler}>Shoot!</button>
    </div>
  );
}

function ScoreBoard(props) {
  return (
    <div className="ScoreBoard">
      <div className="teamStats">
        <h3>VISITORS</h3>
        <h3>{props.visitingTeamStats.score}</h3>
      </div>

      <h3>SCOREBOARD</h3>

      <div className="teamStats">
        <h3>HOME</h3>
        <h3>{props.homeTeamStats.score}</h3>
      </div>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      homeTeamStats: {
        shots: 0,
        score: 0,
      },
      visitingTeamStats: {
        shots: 0,
        score: 0,
      },
    };

    this.shotSound = new Audio("./Sounds/shots.mp3");
    this.scoreSound = new Audio("./Sounds/score.mp3");
  }
  shoot = (team) => {
    const teamStatsKey = `${team}TeamStats`;
    let score = this.state[teamStatsKey].score;
    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;
      this.scoreSound.play();
    }

    this.setState((state, props) => ({
      [teamStatsKey]: {
        shots: state[teamStatsKey].shots + 1,
        score,
      },
    }));
  };

  resetGame = () => {
    this.setState((state, props) => ({
      resetCount: state.resetCount + 1,
      homeTeamStats: {
        shots: 0,
        score: 0,
      },
      visitingTeamStats: {
        shots: 0,
        score: 0,
      },
    }));
  };

  render() {
    return (
      <div className="Game">
        <ScoreBoard
          visitingTeamStats={this.state.visitingTeamStats}
          homeTeamStats={this.state.homeTeamStats}
        />

        <h1>Welcome To {this.props.venue}</h1>
        <div className="stats">
          <Team
            name={this.props.visitingTeam.name}
            logo={this.props.visitingTeam.logoSrc}
            stats={this.state.visitingTeamStats}
            shotHandler={() => this.shoot("visiting")}
          />

          <div className="versus">
            <h1>VS</h1>
            <div>
              <strong>Resets:</strong> {this.state.resetCount}
              <button onClick={this.resetGame}>Reset Game</button>
            </div>
          </div>
          <Team
            name={this.props.homeTeam.name}
            logo={this.props.homeTeam.logoSrc}
            stats={this.state.homeTeamStats}
            shotHandler={() => this.shoot("home")}
          />
        </div>
      </div>
    );
  }
}

function App(props) {
  const afm = {
    name: "We Are All Bowlers",
    logoSrc: "./Images/AMF.png",
  };

  const kingPins = {
    name: "King Pins",
    logoSrc: "./Images/kingpins.png",
  };

  const olympiaLanes = {
    name: "Olympia Lanes",
    logoSrc: "./Images/Olympia Lanes.png",
  };

  const stardusBowl = {
    name: "Stardus Bowl lll",
    logoSrc: "./Images/Stardus Bowl lll.png",
  };
  return (
    <div className="App">
      <Game
        venue="Bowling Night Game Pizza and Beer"
        homeTeam={afm}
        visitingTeam={kingPins}
      />
      <Game
        venue="Bowling Day Game burgers and Soda"
        homeTeam={olympiaLanes}
        visitingTeam={stardusBowl}
      />
    </div>
  );
}

// Render the App
ReactDOM.render(<App />, document.getElementById("root"));

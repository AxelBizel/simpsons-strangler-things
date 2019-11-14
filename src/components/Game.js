import React, { Component } from "react";
import "../App.css";
import HomerLife from "./HomerLife.js";
import Counter from "./Counter.js";
import Projectiles from "./Projectiles";
import SwipeDetection from "./SwipeDetection";
import Characters from "./Characters";
import ModalWin from "./modalwin";
import ModalLose from "./modallose";
import ModalStreak from "./ModalStreak";
import { randomOf } from "./helpers";
import Doughnut from "../Design/Projectiles/doughnut.png";
import Duff from "../Design/Projectiles/duff.png";
import Brocoli from "../Design/Projectiles/brocoli.png";
import Flanders from "../Design/Projectiles/flanders.png";
import GameRules from "./GameRules.js";
import { GameContext } from "../providers/GameProvider";
import Doh from "../Design/Sounds/homer-doh.mp3";
import Bgsound from "../Design/Sounds/game-generique.mp3";
import Barriere from "./Barriere";
import Level from "./Level";
import ModalDrunk from "./ModalDrunk";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      move: null,
      lifeNumber: 5,
      lifeMax: 5,
      gameRuleDisplay: false,
      items: [
        { name: "doughnut", image: Doughnut },
        { name: "brocoli", image: Brocoli },
        { name: "duff", image: Duff },
        { name: "flanders", image: Flanders }
      ],
      swipeZone: [],
      projectiles: [],
      index: 0,
      win: false,
      lose: false,
      pause: false,
      resume: false,
      streak: [],
      count: parseInt(localStorage.getItem("count")) || 0,
      movement: "none"
      drunkMode: false,
      displayModalDrunk: false,
    };
    this.baseState = this.state;
    this.doh = new Audio(Doh);
    this.bgsound = new Audio(Bgsound);
    this.newGameHasBeenInitialized = false;
  }

  static contextType = GameContext;

  componentDidMount() {
    this.initializeGame(true);
  }

  initializeGame = justMount => {
    this.state.win && localStorage.setItem("count", this.state.count);
    !justMount &&
      this.setState({
        ...this.baseState,
        count: parseInt(localStorage.getItem("count"))
      });
    const { nbProjectiles } = this.context;
    this.remainingProjectiles = nbProjectiles;
    this.projectilesToLaunch = nbProjectiles;

    this.launchGame();
  };

  ruleModalDisplay = () => {
    this.setState({ gameRuleDisplay: !this.state.gameRuleDisplay });
    this.state.gameRuleDisplay ? this.resumeGame() : this.pauseGame();
  };

  launchGame = () => {
    this.interval = setInterval(() => {
      if (this.projectilesToLaunch > 0) {
        const { projectiles, index } = this.state;
        this.setState({
          projectiles: [
            ...projectiles,
            { id: index, type: this.state.items[randomOf(4)] }
          ],
          index: index + 1
        });
        this.projectilesToLaunch--;
      }
    }, 1200);
    this.context.isMusicOn && this.bgsound.play();
  };

  removeRemainingProjectile = () => {
    console.log(this.remainingProjectiles);
    this.remainingProjectiles--;
  };

  componentWillUnmount() {
    window.clearInterval(this.interval);
    this.bgsound.pause();
  }

  winFunc = () => {
    this.pauseGame();
    setTimeout(() => {
      this.setState({ win: true });
      // localStorage.setItem("count", this.state.count);
    }, 10);
  };

  deleteProjectile = projectileId => {
    const projectiles = this.state.projectiles.filter(
      projectile => projectile.id !== projectileId
    );
    this.setState({ projectiles: projectiles });
  };

  // checkLose = () => {
  //   if (this.state.lifeNumber < 1) {
  //     this.pauseGame();
  //     setTimeout(() => this.setState({ lose: true }), 10);
  //   }
  // };

  isDrunk = () => {
    const { streak } = this.state;
    if (streak[streak.length - 2].type.name === "duff" && streak[streak.length - 3].type.name === "duff") {
      this.setState({ drunkMode: true, displayModalDrunk: true })
      setTimeout(() => this.setState({displayModalDrunk: false}), 3000)
      }
  }

  isSober = () => {
    const { streak } = this.state;
    if (streak.length >= 4 && this.state.drunkMode && streak[streak.length - 2].type.name !== "duff" && streak[streak.length - 3].type.name !== "duff" && streak[streak.length - 4].type.name !== "duff") {
      this.setState({ drunkMode: false })
      }
  }

  handleSwipe = event => {
    if (event === "right") {
      this.setState({movement : "right"});
      const projectileToRemove = this.state.swipeZone.find(
        projectile => projectile.type.name === "duff"
      );
      // this.checkWin();
      if (projectileToRemove) {
        this.removeProjectileFromSwipeZone(projectileToRemove.id);
        this.deleteProjectile(projectileToRemove.id);
        this.setState({ streak: [...this.state.streak, projectileToRemove] });
        this.addPoints(projectileToRemove.coeff);
      }
    }
    if (event === "left") {
      this.setState({movement : "left"});
      const projectileToRemove = this.state.swipeZone.find(
        projectile => projectile.type.name === "doughnut"
      );
      // this.checkWin();
      if (projectileToRemove) {
        this.removeProjectileFromSwipeZone(projectileToRemove.id);
        this.deleteProjectile(projectileToRemove.id);
        this.setState({ streak: [...this.state.streak, projectileToRemove] });
        this.addPoints(projectileToRemove.coeff);
      }
    }
    if (event === "touch") {
      this.setState({movement : "avoid"});
      const projectileToRemove = this.state.swipeZone.find(
        projectile =>
          projectile.type.name === "brocoli" ||
          projectile.type.name === "flanders"
      );
      // this.checkWin();
      if (projectileToRemove) {
        this.removeProjectileFromSwipeZone(projectileToRemove.id);
        this.deleteProjectile(projectileToRemove.id);
        this.setState({ streak: [...this.state.streak, projectileToRemove] });
        this.addPoints(projectileToRemove.coeff);
      }
    }
  };

  addPoints = coeff => {
    if (this.state.streak.length < 5) {
      this.setState({ count: this.state.count + 50 * coeff });
    } else if (this.state.streak.length < 10) {
      this.setState({ count: this.state.count + 75 * coeff });
    } else if (this.state.streak.length < 15) {
      this.setState({ count: this.state.count + 100 * coeff });
    } else if (this.state.streak.length < 20) {
      this.setState({ count: this.state.count + 150 * coeff });
    } else {
      this.setState({ count: this.state.count + 200 * coeff });
    }
  };

  reduceLife = () => {
    const { isFxOn } = this.context;
    // { e => this.reduceLife()} pour l'utiliser
    if (this.state.lifeNumber > 1) {
      this.setState(state => {
        isFxOn && this.doh.play();
        return { lifeNumber: state.lifeNumber - 1, streak: [] };
      });
    } else {
      isFxOn && this.doh.play();
      this.setState({ lose: true });
      this.pauseGame();
    }
  };

  addLife = () => {
    this.state.lifeNumber < this.state.lifeMax &&
      this.setState(state => {
        return { lifeNumber: state.lifeNumber + 1 };
      });
  };

  addProjectileToSwipeZone = projectile => {
    this.setState({ swipeZone: [...this.state.swipeZone, projectile] });
  };

  removeProjectileFromSwipeZone = projectileId => {
    const projectiles = this.state.swipeZone.filter(
      projectileInSwipeZone => projectileInSwipeZone.id !== projectileId
    );
    this.setState({ swipeZone: projectiles });
    this.removeRemainingProjectile();
    if (this.remainingProjectiles === 0 && !this.state.lose) this.winFunc();
  };

  pauseGame = () => {
    window.clearInterval(this.interval);
    this.setState({ pause: true });
    this.bgsound.pause();
  };

  resumeGame = () => {
    this.launchGame();
    this.setState({ pause: false, resume: true });
    this.context.isMusicOn && this.bgsound.play();
  };

  componentDidUpdate(prevProps, prevState) {
    const { streak, resume } = this.state
    if (resume) this.setState({ resume: false });
    if (streak !== prevState.streak && streak.length >= 3 && streak[streak.length - 1].type.name === "duff" )  {
      this.isDrunk();
    }
    if (streak !== prevState.streak && streak.length >= 3 && streak[streak.length - 1].type.name !== "duff") {
      this.isSober();
    }
  }

  render() {
    return (
      <div className="App">
        {!this.state.win && !this.state.lose && <Level />}
        <Barriere />
        <Barriere right />
        {!this.state.win && !this.state.lose && (
          <HomerLife
            lifeNumber={this.state.lifeNumber}
            lifeMax={this.state.lifeMax}
          />
        )}
        {!this.state.win && !this.state.lose && (
          <Counter count={this.state.count} />
        )}
        <Characters movement={this.state.movement}/>
        <Projectiles
          projectiles={this.state.projectiles}
          deleteProjectile={this.deleteProjectile}
          addProjectileToSwipeZone={this.addProjectileToSwipeZone}
          removeProjectileFromSwipeZone={this.removeProjectileFromSwipeZone}
          removeRemainingProjectile={this.removeRemainingProjectile}
          reduceLife={this.reduceLife}
          pause={this.state.pause}
          resume={this.state.resume}
          getCoeff={this.getCoeff}
        />
        <SwipeDetection handleSwipe={this.handleSwipe} drunkMode={this.state.drunkMode}/>
        {!this.state.win && !this.state.lose && (
          <button
            onClick={e => this.ruleModalDisplay()}
            style={{ position: "fixed", zIndex: 3000 }}
          >
            <p className="buttonPause">
              <i
                className="fas fa-pause"
                onClick={this.props.ruleModalDisplay}
              />
            </p>
          </button>
        )}
        {this.state.streak.length > 0 &&
          this.state.streak.length % 5 === 0 &&
          !this.state.win &&
          !this.state.lose && <ModalStreak streak={this.state.streak.length} />}

        {this.state.gameRuleDisplay && (
          <GameRules ruleModalDisplay={this.ruleModalDisplay} />
        )}
        {this.state.win && <ModalWin initializeGame={this.initializeGame} />}
        {this.state.lose && <ModalLose initializeGame={this.initializeGame} />}
        {this.state.displayModalDrunk && !this.state.win && !this.state.lose && <ModalDrunk />}
      </div>
    );
  }
}

export default Game;

import * as Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';
import { GAME_CONFIG } from './utils/GameConstants';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: GAME_CONFIG.WIDTH,
    height: GAME_CONFIG.HEIGHT,
    parent: 'game-container',
    backgroundColor: '#2c3e50',
    scene: GameScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 }
        }
    }
};

const game = new Phaser.Game(config);

export default game;
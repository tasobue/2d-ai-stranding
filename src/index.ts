import * as Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.add.text(400, 300, '2D AI Stranding', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);
    }

    create() {
        this.add.text(400, 350, 'ゲーム開発中...', {
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0.5);
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
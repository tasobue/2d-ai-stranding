import * as Phaser from 'phaser';
import { GAME_CONFIG, COLORS, TileType, Position } from '../utils/GameConstants';
import { Player } from '../entities/Player';

export class GameScene extends Phaser.Scene {
    private player!: Player;
    private map: TileType[][];
    private startPosition: Position;
    private goalPosition: Position;
    private mapGraphics!: Phaser.GameObjects.Graphics;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasdKeys!: any;
    private gameWon: boolean = false;

    constructor() {
        super({ key: 'GameScene' });
        
        this.map = this.createSimpleMap();
        this.startPosition = { x: 0, y: 0 };
        this.goalPosition = { x: 15, y: 15 };
    }

    private createSimpleMap(): TileType[][] {
        const map: TileType[][] = [];
        for (let y = 0; y < GAME_CONFIG.MAP_HEIGHT; y++) {
            map[y] = [];
            for (let x = 0; x < GAME_CONFIG.MAP_WIDTH; x++) {
                map[y][x] = TileType.GRASS;
            }
        }
        return map;
    }

    public create(): void {
        this.createMap();
        this.createPlayer();
        this.createInput();
        this.createUI();
    }

    private createMap(): void {
        this.mapGraphics = this.add.graphics();
        this.drawMap();
    }

    private drawMap(): void {
        this.mapGraphics.clear();
        
        for (let y = 0; y < GAME_CONFIG.MAP_HEIGHT; y++) {
            for (let x = 0; x < GAME_CONFIG.MAP_WIDTH; x++) {
                const pixelX = x * GAME_CONFIG.TILE_SIZE;
                const pixelY = y * GAME_CONFIG.TILE_SIZE;
                
                let color: number = COLORS.GRASS;
                if (this.map[y][x] === TileType.WATER) {
                    color = COLORS.WATER;
                }
                
                this.mapGraphics.fillStyle(color);
                this.mapGraphics.fillRect(pixelX, pixelY, GAME_CONFIG.TILE_SIZE, GAME_CONFIG.TILE_SIZE);
                
                this.mapGraphics.lineStyle(1, COLORS.GRID, 0.3);
                this.mapGraphics.strokeRect(pixelX, pixelY, GAME_CONFIG.TILE_SIZE, GAME_CONFIG.TILE_SIZE);
            }
        }
        
        this.drawStartAndGoal();
    }

    private drawStartAndGoal(): void {
        const startPixelX = this.startPosition.x * GAME_CONFIG.TILE_SIZE;
        const startPixelY = this.startPosition.y * GAME_CONFIG.TILE_SIZE;
        this.mapGraphics.fillStyle(COLORS.START);
        this.mapGraphics.fillRect(startPixelX, startPixelY, GAME_CONFIG.TILE_SIZE, GAME_CONFIG.TILE_SIZE);
        
        const goalPixelX = this.goalPosition.x * GAME_CONFIG.TILE_SIZE;
        const goalPixelY = this.goalPosition.y * GAME_CONFIG.TILE_SIZE;
        this.mapGraphics.fillStyle(COLORS.GOAL);
        this.mapGraphics.fillRect(goalPixelX, goalPixelY, GAME_CONFIG.TILE_SIZE, GAME_CONFIG.TILE_SIZE);
    }

    private createPlayer(): void {
        this.player = new Player(this, this.startPosition.x, this.startPosition.y);
    }

    private createInput(): void {
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.wasdKeys = this.input.keyboard!.addKeys('W,S,A,D');
    }

    private createUI(): void {
        this.add.text(GAME_CONFIG.MAP_WIDTH * GAME_CONFIG.TILE_SIZE + 20, 20, '2D AI Stranding', {
            fontSize: '24px',
            color: '#ffffff'
        });
        
        this.add.text(GAME_CONFIG.MAP_WIDTH * GAME_CONFIG.TILE_SIZE + 20, 60, 'WASD or Arrow Keys to move', {
            fontSize: '14px',
            color: '#cccccc'
        });
        
        this.add.text(GAME_CONFIG.MAP_WIDTH * GAME_CONFIG.TILE_SIZE + 20, 80, 'Reach the yellow goal!', {
            fontSize: '14px',
            color: '#cccccc'
        });
    }

    public update(): void {
        if (this.gameWon) {
            return;
        }

        this.handleInput();
        this.checkWinCondition();
    }

    private handleInput(): void {
        const justPressed = {
            up: Phaser.Input.Keyboard.JustDown(this.cursors.up!) || Phaser.Input.Keyboard.JustDown(this.wasdKeys.W),
            down: Phaser.Input.Keyboard.JustDown(this.cursors.down!) || Phaser.Input.Keyboard.JustDown(this.wasdKeys.S),
            left: Phaser.Input.Keyboard.JustDown(this.cursors.left!) || Phaser.Input.Keyboard.JustDown(this.wasdKeys.A),
            right: Phaser.Input.Keyboard.JustDown(this.cursors.right!) || Phaser.Input.Keyboard.JustDown(this.wasdKeys.D)
        };

        const currentPos = this.player.getGridPosition();
        let newX = currentPos.x;
        let newY = currentPos.y;

        if (justPressed.up) newY--;
        if (justPressed.down) newY++;
        if (justPressed.left) newX--;
        if (justPressed.right) newX++;

        if (newX !== currentPos.x || newY !== currentPos.y) {
            this.player.moveToGrid(newX, newY);
        }
    }

    private checkWinCondition(): void {
        const playerPos = this.player.getGridPosition();
        if (playerPos.x === this.goalPosition.x && playerPos.y === this.goalPosition.y) {
            this.gameWon = true;
            this.showWinMessage();
        }
    }

    private showWinMessage(): void {
        const centerX = GAME_CONFIG.WIDTH / 2;
        const centerY = GAME_CONFIG.HEIGHT / 2;
        
        const bg = this.add.rectangle(centerX, centerY, 300, 150, 0x000000, 0.8);
        bg.setStrokeStyle(3, COLORS.GOAL);
        
        this.add.text(centerX, centerY - 20, 'CLEAR!', {
            fontSize: '32px',
            color: '#ffd43b'
        }).setOrigin(0.5);
        
        this.add.text(centerX, centerY + 20, 'Press R to restart', {
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        this.input.keyboard!.on('keydown-R', () => {
            this.scene.restart();
        });
    }
}
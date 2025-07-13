import * as Phaser from 'phaser';
import { GAME_CONFIG, COLORS, Position } from '../utils/GameConstants';

export class Player {
    private sprite: Phaser.GameObjects.Rectangle;
    private scene: Phaser.Scene;
    public gridPosition: Position;

    constructor(scene: Phaser.Scene, gridX: number, gridY: number) {
        this.scene = scene;
        this.gridPosition = { x: gridX, y: gridY };
        
        const pixelX = gridX * GAME_CONFIG.TILE_SIZE + GAME_CONFIG.TILE_SIZE / 2;
        const pixelY = gridY * GAME_CONFIG.TILE_SIZE + GAME_CONFIG.TILE_SIZE / 2;
        
        this.sprite = scene.add.rectangle(pixelX, pixelY, GAME_CONFIG.TILE_SIZE - 4, GAME_CONFIG.TILE_SIZE - 4, COLORS.PLAYER);
        this.sprite.setStrokeStyle(2, 0xffffff);
    }

    public moveToGrid(gridX: number, gridY: number): void {
        if (gridX < 0 || gridX >= GAME_CONFIG.MAP_WIDTH || gridY < 0 || gridY >= GAME_CONFIG.MAP_HEIGHT) {
            return;
        }

        this.gridPosition.x = gridX;
        this.gridPosition.y = gridY;
        
        const pixelX = gridX * GAME_CONFIG.TILE_SIZE + GAME_CONFIG.TILE_SIZE / 2;
        const pixelY = gridY * GAME_CONFIG.TILE_SIZE + GAME_CONFIG.TILE_SIZE / 2;
        
        this.sprite.setPosition(pixelX, pixelY);
    }

    public getGridPosition(): Position {
        return { ...this.gridPosition };
    }

    public destroy(): void {
        this.sprite.destroy();
    }
}
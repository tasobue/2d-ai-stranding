export const GAME_CONFIG = {
    WIDTH: 800,
    HEIGHT: 600,
    TILE_SIZE: 32,
    MAP_WIDTH: 16,
    MAP_HEIGHT: 16
} as const;

export const COLORS = {
    GRASS: 0x4a7c59,
    WATER: 0x2e5266,
    PLAYER: 0xff6b6b,
    START: 0x51cf66,
    GOAL: 0xffd43b,
    GRID: 0x34495e
} as const;

export enum TileType {
    GRASS = 0,
    WATER = 1
}

export type Position = {
    x: number;
    y: number;
};
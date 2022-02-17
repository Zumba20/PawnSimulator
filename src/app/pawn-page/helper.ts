import { command, direction, color } from './app-enum';
import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
    parseCommand(cmd: string): command {
        switch (cmd.toUpperCase()) {
            case 'PLACE':
                return command.PLACE;
            case 'MOVE':
                return command.MOVE;
            case 'LEFT':
                return command.LEFT;
            case 'RIGHT':
                return command.RIGHT;
                case 'REPORT':
                        return command.REPORT;
            default:
                throw new Error('Invalid command');
        }
    }

    parseDirection(facing: string): direction {
        switch (facing.toUpperCase()) {
            case 'NORTH':
                return direction.NORTH;
            case 'SOUTH':
                return direction.SOUTH;
            case 'EAST':
                return direction.EAST;
            case 'WEST':
                return direction.WEST;
            default:
                throw new Error('Invalid direction');
        }
    }


    parseColor(clr: string): color {
        switch (clr.toUpperCase()) {
            case 'WHITE':
                return color.WHITE;
            case 'BLACK':
                return color.BLACK;
            default:
                throw new Error('Invalid color');
        }
    }

}
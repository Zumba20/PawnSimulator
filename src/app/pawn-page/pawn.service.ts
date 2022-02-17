import { Injectable } from '@angular/core';
import { Pawn } from './pawn';
import { direction, color } from './app-enum';

@Injectable({
  providedIn: 'root'
})

export class PawnService {

  move(pawn: Pawn, places: number) {
    if (pawn.xPos == 0 && pawn.yPos == 0 && (pawn.direction == direction.WEST || pawn.direction == direction.SOUTH) ||
      pawn.xPos == 7 && pawn.yPos == 7 && (pawn.direction == direction.EAST || pawn.direction == direction.NORTH) ||
      pawn.xPos == 0 && pawn.direction == direction.WEST || pawn.yPos == 0 && pawn.direction == direction.SOUTH ||
      pawn.xPos == 7 && pawn.direction == direction.EAST || pawn.yPos == 7 && pawn.direction == direction.NORTH
    ) {
      return;
    }
    if (pawn.direction == direction.NORTH && pawn.yPos < 7 && pawn.yPos + places <= 7) pawn.yPos += places;
    if (pawn.direction == direction.SOUTH && pawn.yPos > 1 && pawn.yPos - places > -1) pawn.yPos -= places;
    if (pawn.direction == direction.EAST && pawn.xPos < 7 && pawn.xPos + places <= 7) pawn.xPos += places;
    if (pawn.direction == direction.WEST && pawn.xPos > 1 && pawn.xPos - places > -1) pawn.xPos -= places;
  }
  left(pawn: Pawn) {
    let facing = pawn.direction;
    pawn.direction = facing >= 1 ? facing - 1 : direction.NORTH;
  }

  right(pawn: Pawn) {
    let facing = pawn.direction;
    pawn.direction = facing <= 2 ? facing + 1 : direction.EAST;
  }

  report(pawn: Pawn): string {
    return `${pawn.xPos},${pawn.yPos},${direction[pawn.direction]},${color[pawn.color]}`;
  }

  place(xPos: number, yPos: number, direction: direction, color: color): Pawn {
    return new Pawn(xPos, yPos, direction, color);
  }
}

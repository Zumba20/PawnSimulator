import { TestBed } from '@angular/core/testing';

import { PawnService } from './pawn.service';
import { direction, color, command } from './app-enum';
import { Pawn } from './pawn';
describe('PawnService', () => {
  let service: PawnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PawnService);
  });

  it('pawn should move towards NORTH by 1 step', () => {
    const service: PawnService = TestBed.get(PawnService);
    let pawn = service.place(0, 0, direction.NORTH, color.WHITE);
    service.move(pawn, 1);
    expect(pawn.direction).toBe(direction.NORTH);
    expect(pawn.xPos).toBe(0);
    expect(pawn.yPos).toBe(1);
  });

  it('pawn should move towards EAST on rotating towards RIGHT', () => {
    const service: PawnService = TestBed.get(PawnService);
    let pawn = service.place(0, 0, direction.NORTH, color.WHITE);
    service.right(pawn);
    expect(pawn.direction).toBe(direction.EAST);
    expect(pawn.xPos).toBe(0);
    expect(pawn.yPos).toBe(0);
  });

  it('REPORT should display correct pawn state', () => {
    const service: PawnService = TestBed.get(PawnService);
    let pawn = service.place(0, 0, direction.NORTH, color.WHITE);
    service.move(pawn,1);
    expect(service.report(pawn)).toBe('0,1,NORTH,WHITE');
  });

  it('Pawn should move towards West from North', () => {
    const service: PawnService = TestBed.get(PawnService);
    let pawn = service.place(0, 0, direction.NORTH, color.BLACK);
    service.left(pawn);
    expect(service.report(pawn)).toBe('0,0,WEST,BLACK');
  });

  it('Pawn should move towards North from East', () => {
    const service: PawnService = TestBed.get(PawnService);
    let pawn = service.place(1, 2, direction.EAST, color.BLACK);
    service.move(pawn,2);
    service.move(pawn,1);
    service.left(pawn);
    service.move(pawn,1);
    expect(service.report(pawn)).toBe('4,3,NORTH,BLACK');
  });
});

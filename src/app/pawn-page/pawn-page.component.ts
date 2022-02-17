import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pawn } from './pawn';
import { PawnService } from './pawn.service';
import { HelperService } from './helper';
import { direction, color, command } from './app-enum';
@Component({
  selector: 'app-pawn-page',
  templateUrl: './pawn-page.component.html',
  styleUrls: ['./pawn-page.component.css'],
  providers: [PawnService]
})
export class PawnPageComponent implements OnInit {

  public cmdOutput: string = '';
  public arrayCmd: Array<command> = [];
  public xPos: any = 0;
  public yPos: any = 0;
  public moveInput: any = 1;
  public selectedDirection = "null";
  public selectedColor = "null";
  public hasDirValue: boolean = true;
  public hasClrValue: boolean = true;
  public output: string = '';
  public moveCounter: number = 0;
  public placeCount: number = 0;
  private pawn: Pawn = new Pawn(0, 0, direction.NORTH, color.WHITE);
  constructor(private pawnService: PawnService, private helperService: HelperService) {
  }

  ngOnInit(): void {
    if (this.xPos === null) {

    } else if (this.xPos === null) {
    }
  }

  get getEnumDirectionValue() {
    let keys = Object.keys(direction);
    let values = Object.values(direction);
    let directionArray: any[] = [];
    let stringCat = "["
    for (var i = 0; i < keys.length; i++) {
      if (!isNaN(parseInt(keys[i]))) {
        stringCat += '{"key":' + keys[i] + ',' + '"value":"' + values[i] + '"},';
      }
    }
    stringCat = stringCat.substring(0, stringCat.length - 1);
    stringCat += "]"
    //console.log(stringCat);
    directionArray = JSON.parse(stringCat);
    return directionArray;
  }

  get getEnumColorValue() {
    let keys = Object.keys(color);
    let values = Object.values(color);
    let colorsArray: any[] = [];
    let stringCat = "["
    for (var i = 0; i < keys.length; i++) {
      if (!isNaN(parseInt(keys[i]))) {
        stringCat += '{"key":' + keys[i] + ',' + '"value":"' + values[i] + '"},';
      }
    }
    stringCat = stringCat.substring(0, stringCat.length - 1);
    stringCat += "]"
    //console.log(stringCat);
    colorsArray = JSON.parse(stringCat);
    return colorsArray;
  }

  get checkPlace() {
    if (this.placeCount > 0) {
      return true;
    } else {
      this.cmdOutput = '<p class="alert alert-danger" role="alert">Please PLACE the pawn before executing other commands.</p>';
      return false;
    }
  }
  onClrSubmit() {
    if (this.selectedColor === 'null') {
      this.hasClrValue = false;
    } else {
      this.hasClrValue = true;
    }
  }
  onDirSubmit() {
    if (this.selectedDirection === 'null') {
      this.hasDirValue = false;
    } else {
      this.hasDirValue = true;
    }
  }
  get onTextXChange() {
    if (this.xPos === null) {
      return false;
    }
    return true;
  }
  get onTextYChange() {
    if (this.yPos === null) {
      return false;
    }
    return true;
  }
  place() {
    this.onClrSubmit();
    this.onDirSubmit();
    if (this.onTextXChange === true && this.onTextYChange === true) {
      if (this.selectedDirection != "null" && this.selectedColor != "null") {
        this.cmdOutput += `<p  class="alert alert-primary" role="alert">${command[0]} ${this.xPos},${this.yPos},${this.selectedDirection},${this.selectedColor}</p>`;
        this.pawn = this.pawnService.place(this.xPos, this.yPos, this.helperService.parseDirection(this.selectedDirection), this.helperService.parseColor(this.selectedColor));
        ++this.placeCount;
      } else {
      }
    }
  }
  move() {
    if (!!this.checkPlace) {
      if (this.moveCounter == 0 && parseInt(this.moveInput) > 2) {
        this.cmdOutput += '<p class="alert alert-danger" role="alert">Wrong Move</p>';
      } else {
        this.pawnService.move(this.pawn, isNaN(this.moveInput) || this.moveInput === null ? 1 : parseInt(this.moveInput));
        this.cmdOutput += `<p class="alert alert-primary" role="alert">${command[1]} ${isNaN(this.moveInput) || this.moveInput === null ? " " : parseInt(this.moveInput)}</p>`;
        ++this.moveCounter;
      }
    }
  }

  left() {
    if (!!this.checkPlace) {
      this.cmdOutput += `<p class="alert alert-primary" role="alert">${command[2]}</p>`;
      this.pawnService.left(this.pawn);
    }
  }

  right() {
    if (!!this.checkPlace) {
      this.cmdOutput += `<p class="alert alert-primary" role="alert">${command[3]}</p>`;
      this.pawnService.right(this.pawn);
    }
  }

  report() {
    if (!!this.checkPlace) {
      this.cmdOutput += `<p class="alert alert-primary" role="alert">${command[4]}</p>`;
      this.output = `<p class="alert alert-primary" role="alert">${this.pawnService.report(this.pawn)}</p>`;
    }
  }
  submit(val: any) {

  }
  /*executeCommand() {
    let splitCommand = this.commandInt.split(" ");
    let checkPlaceCmd =
    this.arrayCmd.push(this.helperService.parseCommand(splitCommand[0]));
    console.log(this.arrayCmd);
    if (this.arrayCmd.includes(command.PLACE)) {
      if(!!this.isValidate){
        this.cmdOutput = '';
        this.isValidate = false;
      }
      this.cmdOutput += "<p>"+splitCommand+"</p>";
      switch (this.helperService.parseCommand(splitCommand[0])) {
        case command.PLACE:
          let details = splitCommand[1].split(",");
          this.pawn = this.pawnService.place(parseInt(details[0]), parseInt(details[1]), this.helperService.parseDirection(details[2]), this.helperService.parseColor(details[3]));
          break;
        case command.MOVE:
          if(this.moveCounter == 0 && parseInt(splitCommand[1]) > 2){
            this.cmdOutput = "<p>Wrong Move</p>";
          }else{
            this.pawnService.move(this.pawn, splitCommand.length > 1 ? parseInt(splitCommand[1]) : 1);
            ++this.moveCounter;
          }
          break;

        case command.LEFT:
          this.pawnService.left(this.pawn);
          break;

        case command.RIGHT:
          this.pawnService.right(this.pawn);
          break;

        case command.REPORT:
          this.output = this.pawnService.report(this.pawn);
          break;
      }
    }else{
      this.cmdOutput = "<p>Please PLACE the pawn before executing other commands.</p>";
      this.isValidate = true;
    }
  };*/

  clear() {
    this.xPos = 0;
    this.yPos = 0;
    this.selectedDirection = "null";
    this.selectedColor = "null";
  }

  reset() {
    this.pawn = new Pawn(0, 0, direction.NORTH, color.WHITE);
    this.xPos = 0;
    this.yPos = 0;
    this.selectedDirection = "null";
    this.selectedColor = "null";
    this.cmdOutput = '';
    this.moveCounter = 0;
    this.moveInput = 1;
    this.output = '';
    this.placeCount = 0;
  }

}

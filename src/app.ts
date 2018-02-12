import { inject } from 'aurelia-dependency-injection';
import { observable, DOM } from "aurelia-framework";

export class App {
  public colours = ['blackberry', 'strawberry', 'mango', 'lime', 'mint', 'white'];
  public primaryColour = 'mint';
  public secondaryColour = 'lime';
  public backgroundColour = 'white';
  public flip: boolean = false;
  public leftEyebrow: boolean = false;
  public rightEyebrow: boolean = false;
  @observable public goCrazy: boolean = false;
  public goCrazyTimer: NodeJS.Timer;
  @observable public party: boolean = false;
  public partyTimer: NodeJS.Timer;
  public goCrazyChanged(newValue) {
    if (newValue) {
      this.random();
    } else {
      clearTimeout(this.goCrazyTimer);
      this.clearAll();
    }
  }

  public clearAll() {
    [].forEach.call(document.querySelectorAll('path, polyline, polygon'),
      (div) => setTransform(div, ''));
  }

  public random() {
    this.randomAll();
    this.goCrazyTimer = setInterval(() => this.randomAll(), 400);
  }

  public randomAll() {
    [].forEach.call(document.querySelectorAll('path, polyline, polygon'),
      (div) => randomTransform(div));
  }

  public partyChanged(newValue) {
    if (newValue) {
      this.partyTimer = setInterval(() => {
        this.setPrimary(this.colours[getRandomInt(this.colours.length)]);
        this.setSecondary(this.colours[getRandomInt(this.colours.length)]);
        this.setBackground(this.colours[getRandomInt(this.colours.length)]);
      }
        , 200);
    } else {
      clearTimeout(this.partyTimer);
      this.setBackground('white');
    }
  }

  public setPrimary(colour: string) {
    this.primaryColour = colour;
    document.documentElement.style.setProperty('--avatar-primary', `var(--${colour})`);
  }

  public setSecondary(colour: string) {
    this.secondaryColour = colour;
    document.documentElement.style.setProperty('--avatar-secondary', `var(--${colour})`);
  }

  public setBackground(colour: string) {
    this.backgroundColour = colour;
    document.documentElement.style.setProperty('--avatar-background', `var(--${colour})`);
  }

  public reset() {
    this.party = false;
    this.leftEyebrow = false;
    this.rightEyebrow = false;
    this.flip = false;
    this.goCrazy = false;
    this.setPrimary('mint');
    this.setSecondary('lime');
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomTransform(el) {
  var trans = "matrix3d(" + Math.random() + ", -" + Math.random() + ", " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", 0, -" + Math.random() + ", 0, " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", 1)";

  setTransform(el, "");
  setTransform(el, trans);
}

function setTransform(el, trans) {
  el.style.transform = trans;
  el.style.webkitTransform = trans;
  el.style.MozTransform = trans;
  el.style.msTransform = trans;
  el.style.OTransform = trans;
}

import { observable } from "aurelia-framework";

export class App {
  public colours: string[] = [
    'blackberry',
    'strawberry',
    'mango',
    'lime',
    'mint',
    'white'
  ];
  public primaryColour = 'mint';
  public secondaryColour = 'lime';
  public backgroundColour = 'white';
  public flip: boolean = false;
  public leftEyebrow: boolean = false;
  public rightEyebrow: boolean = false;
  public randomTimer: NodeJS.Timer;
  public partyTimer: NodeJS.Timer;
  @observable public party: boolean = false;
  @observable public scatter: boolean = false;

  public scatterChanged(newValue) {
    if (newValue) {
      this.random();
    } else {
      clearTimeout(this.randomTimer);
      [].forEach.call(document.querySelectorAll('path, polyline, polygon'),
        (div) => setTransform(div, ''));
    }
  }

  public random() {
    this.randomTimer = setInterval(() =>
      [].forEach.call(document.querySelectorAll('path, polyline, polygon'),
        (div) => randomTransform(div))
      , 400);
  }

  public partyChanged(newValue) {
    if (newValue) {
      this.partyTimer = setInterval(() => {
        this.setPrimary(this.colours[getRandomInt(this.colours.length - 1)]);
        this.setSecondary(this.colours[getRandomInt(this.colours.length - 1)]);
        this.setBackground(this.colours[getRandomInt(this.colours.length - 1)]);
      }
        , 200);
    } else {
      clearTimeout(this.partyTimer);
      this.setBackground('white');
    }
  }

  public setPrimary(colour: string) {
    this.primaryColour = colour;
  }

  public setSecondary(colour: string) {
    this.secondaryColour = colour;
  }

  public setBackground(colour: string) {
    this.backgroundColour = colour;
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

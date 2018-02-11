import { observable } from "aurelia-framework";

export class App {
  public colours = [
    'blackberry',
    'strawberry',
    'mango',
    'lime',
    'mint',
    'white'
  ];
  public primaryColour = 'mint';
  public secondaryColour = 'lime';
  public overridePrimary: boolean = false;
  public overrideSecondary: boolean = false;
  public flip: boolean = false;
  public leftEyebrow: boolean = false;
  public rightEyebrow: boolean = false;
  public randomTimer: NodeJS.Timer;
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

  public setPrimary(colour: string) {
    this.primaryColour = colour;
  }

  public setSecondary(colour: string) {
    this.secondaryColour = colour;
  }
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

export class StateModule {
  constructor(initialState) {
    this.state = {};
    for (let key in initialState) {
      this.state[key] = new Observable(initialState[key]);
    }
  }

  addObserver(key, updateFunc) {
    if (this.state[key]) {
      new Observer(this.state[key], updateFunc);
    }
  }

  set(key, newValue) {
    if (this.state[key]) {
      this.state[key].set(newValue);
    }
  }

  get(key) {
    if (this.state[key]) {
      return this.state[key].value;
    }
  }
}

class Observable extends EventTarget {
  constructor(value) {
    super();
    this.value = value;
  } 
  set(newValue) {
    this.value = newValue;
    this.dispatchEvent(new Event("change"));
  }
}

class Observer {
  constructor(observable, updateFunc) {
    this.observable = observable;
    observable.addEventListener("change", updateFunc);
  }
}

/**
 *
 * @param {StateBaseUI} instance
 * @returns
 */
const handler = function (instance) {
  return {
    get: function (obj, prop) {
      if (
        ["[object Object]", "[object Array]"].indexOf(
          Object.prototype.toString.call(obj[prop])
        ) > -1
      ) {
        return new Proxy(obj[prop], handler(instance));
      }
      return obj[prop];
    },
    set: function (obj, prop, value) {
      obj[prop] = value;
      instance.render();
      return true;
    },
    deleteProperty: function (obj, prop) {
      delete obj[prop];
      instance.render();
      return true;
    },
  };
};

class StateBaseUI {
  /**
   *
   * @param {Object} options
   * @param {string} options.selector
   * @param {object} options.data
   * @param {function(object): string} options.template
   */
  constructor(options) {
    // Variables
    const _this = this;
    _this.elem = document.querySelector(options.selector);
    var _data = new Proxy(options.data, handler(this));
    _this.template = options.template;

    // Define setter and getter for data
    Object.defineProperty(this, "data", {
      get: function () {
        return _data;
      },
      set: function (data) {
        _data = new Proxy(data, handler(_this));
        _this.render();
        return true;
      },
    });
  }
  render() {
    this.elem.innerHTML = this.template(this.data);
  }
}

export default StateBaseUI;

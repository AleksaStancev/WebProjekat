export class DomHelper {
  static createAndAppendElement(host, elementType) {
    const element = document.createElement(elementType);
    host.appendChild(element);
    return element;
  }

  static clearSelectAndSetPlaceholder(select, placeholder) {
    select.options.length = 0;
    const option = DomHelper.createAndAppendElement(select, "option");
    option.disabled = true;
    option.innerHTML = placeholder;
  }

  static populateSelect(select, options) {
    for (let i = 0; i < options.length; i++) {
      let option = this.createAndAppendElement(select, "option");
      option.innerHTML = options[i];
    }
  }
}

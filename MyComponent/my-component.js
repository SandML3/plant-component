console.log("Script funcionando");

class myElement extends HTMLElement {
  //PRIMER CICLO DE VIDA DEL COMPONENTE. Lo creo en Memoria.
  constructor() {
    super();
    //Lo configuro para que, a la hora de montarse, lo haga en el shadow DOM. TERCER CICLO DE VIDA.
    this.attachShadow({ mode: "open" });

    console.log("Hi desde el componente");
  }

  //Observador de cambios en los atributos.
  static get observedAttributes() {
    return ["name", "description", "logo", "image"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "name") {
      this.name = newVal;
    }

    if (attr === "description") {
      this.description = newVal;
    }

    if (attr === "logo") {
      this.logo = newVal;
    }

    if (attr === "image") {
      this.image = newVal;
    }
  }

  getTemplate() {
    //Creo el contenido dentro de una etiqueta <template></template> que posteriormente activaré clonando con js.
    const template = document.createElement("template");
    template.innerHTML = `
        <section>
            <nav>
              <ul>
                <li>Care</li>
                <li>Reproduction</li>
                <li>Diseases</li>
                <li>Curiosities</li>
              </ul>  
            </nav>

            <div>
              <div class="textWrapper">
                  <h1>${this.name}</h1>
                  <p>${this.description}</p>
                  <img src='${this.logo}' />
              </div>
              <div class="image"></div>
            </div>
            
        </section>
        ${this.getStyles()}
    `;
    return template;
  }

  getStyles() {
    //Creo los estilos del componente.
    return `
        <style>
        </style>
    `;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    //SEGUNDO CICLO DE VIDA DEL COMPONENTE. Lo añado al DOM (ya existe como nodo).
    this.render();
  }
}

//Enlazo la clase que acabamos de crear (el componente) con un nombre para poder utilizarlo como un html tag.
customElements.define("my-element", myElement);

//document.querySelector("my-element").remove();

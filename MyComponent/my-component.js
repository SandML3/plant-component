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
    return ["name", "description", "icon", "image"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "name") {
      this.name = newVal;
    }

    if (attr === "description") {
      this.description = newVal;
    }

    if (attr === "icon") {
      this.icon = { icon: newVal, text: "toxic" };
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

            <div class="mainContent">
              <div class="text-wrapper">
                  <h1 class="title">${this.name}</h1>
                  <p class="description" >${this.description}</p>
                  <div class="is-toxic-icon">
                    <img src='${this.icon.icon}' />
                    <p class="icon-text">${this.icon.text}</p>
                  </div>
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
            :host {
                width: 60%;
                min-width: 600px;
                display: inline-block;
                background-color: lightgrey;
                filter: drop-shadow(1rem 1rem 0.5rem rgba(0,0,0, 0.5));
                border-radius: 30px;
                overflow: hidden;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
               
            }

            :host .mainContent {
              display: flex;
              justify-content: space-between;
              min-height: 20vh;
              position: relative;
              
            }

            :host nav ul {
              display: flex;
              list-style: none;
              padding: 1rem;
              gap: 2rem;
              margin-left: 4rem;
            }

            :host section {
                width: 100%;
                
            }

            :host .text-wrapper {
                width: 100%;
                height: 100%;
                margin: 0.2rem;
                margin-left: 4rem;
                display: flex;
                flex-direction: column;
            }

            :host h1 {
                text-transform: uppercase;
                font-size: 35px;
                margin: 1rem;
            }

            
            :host .description {
              margin: 0.5rem;
             }

            :host img {
              width: 1.5rem;
            }

            :host .is-toxic-icon {
              background-color: rgb(195, 195, 195);
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 2rem;
              border-radius: 20%;
              padding: 0.3rem 1rem;
              margin: 1rem;
            }

            :host .icon-text {
              color: white;
              font-weight: 700; 
              margin: 0; 
              font-size: 0.6rem;          
          }

            :host .image {
                width: 900px;
                height: 350px;
                position: asolute;
                right: 0;
                bottom: 0;
                background-image: url('${this.image}');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: bottom;
            }

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

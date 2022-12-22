console.log("Script funcionando");

class myElement extends HTMLElement {
  //PRIMER CICLO DE VIDA DEL COMPONENTE. Lo creo en Memoria.
  constructor() {
    super();
    //Lo configuro para que, a la hora de montarse, lo haga en el shadow DOM. TERCER CICLO DE VIDA.
    this.attachShadow({ mode: "open" });

    this.iconInfo = {
      isToxic: this.hasAttribute("toxic"),
      isEasy: this.hasAttribute("easy"),
      needLigth: this.hasAttribute("light"),
    };

    console.log("Hi desde el componente", this.iconInfo.isToxic);
  }

  //Observador de cambios en los atributos.
  static get observedAttributes() {
    return ["name", "description", "icon", "image", "logo", "section"];
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

    if (attr === "logo") {
      this.logo = newVal;
    }

    if (attr === "section") {
      this.section = newVal;
    }
  }

  getTemplate() {
    //Creo el contenido dentro de una etiqueta <template></template> que posteriormente activaré clonando con js.
    const template = document.createElement("template");

    // const icon = (
    //   <div class="is-toxic-icon">
    //     <img src="${this.icon.icon}" />
    //     <p class="icon-text">${this.icon.text}</p>
    //   </div>
    // );

    template.innerHTML = `
        <section class="component">
            <nav class="navigation-menu">
              <div class="navigation-menu-logo"></div>
              <ul class="navigation-menu-list">
                <li class="navigation-menu-listItem ${
                  this.section === "plant" ? "active" : ""
                }">Plant</li>
                <li class="navigation-menu-listItem ${
                  this.section === "care" ? "active" : ""
                }">Care</li>
                <li class="navigation-menu-listItem ${
                  this.section === "reproduction" ? "active" : ""
                }">Reproduction</li>
                <li class="navigation-menu-listItem ${
                  this.section === "diseases" ? "active" : ""
                }">Diseases</li>
                <li class="navigation-menu-listItem ${
                  this.section === "curiosities" ? "active" : ""
                }">Curiosities</li>
              </ul>  
            </nav>

            <div class="mainContent">
              <div class="text-wrapper">
                  <h1 class="title">${this.name}</h1>
                  <p class="description" >${this.description}</p>
                  <button class="button" > Add </button>

                  <div class="icon-wrapper">
                    
                  
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
                min-width: 800px;
                display: inline-block;
                background-color: lightgrey;
                filter: drop-shadow(1rem 1rem 0.5rem rgba(0,0,0, 0.5));
                border-radius: 30px;
                overflow: hidden;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 1rem;
            }

            :host .component {
              width: 100%;
            }

            :host .navigation-menu {
              display: flex;
              padding: 1rem;
            }

            :host .active {
              font-weight: 700;
              border-bottom: 1px solid black;
            }

            :host .navigation-menu-logo {
              width: 50px;
              background-image: url('${this.logo}');
              background-repeat: no-repeat;
              margin: 0.5rem;
              margin-left: 4rem;
              backgrond-size: cover;
            }

            :host .navigation-menu ul {
              display: flex;
              list-style: none;
              gap: 3rem;
            }
            
            :host .mainContent {
              display: flex;
              justify-content: space-between;
              position: relative;
              min-height: max-content;
            }

            :host .text-wrapper {
                width: 100%;
                height: 100%;
                margin: 0.2rem;
                margin-left: 4rem;
                display: flex;
                flex-direction: column;
                padding-bottom: 2rem;
            }

            :host h1 {
                text-transform: uppercase;
                font-size: 35px;
                margin: 1rem;
            }

            
            :host .description {
              margin: 0.5rem;
              width: 40%;
             }

             :host .button {
              margin: 0.5rem;
              width:100px;
              background-color: rgb(71, 114, 35);
              border-color: transparent;
              border: 1px solid rgba(56, 90, 28, 0.3);
              border-radius: 100px;
              color: white;
              padding: 0.5rem;
              filter: drop-shadow(0.3rem 0.3rem 0.3rem rgba(0,0,0, 0.4));
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              background: linear-gradient(160deg, rgb(71, 114, 35) 0%, rgb(37, 60, 18) 70%, rgb(37, 60, 18) 100%);
              margin-bottom: 2rem;
             }

            :host img {
              width: 1.5rem;
            }

            :host .is-toxic-icon {
              background-color: rgba(37, 60, 18, 0.8);
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
                width: 400px;
                height: 100%;
                position: absolute;
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

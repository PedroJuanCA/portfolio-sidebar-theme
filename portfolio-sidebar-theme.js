// portfolio-sidebar-theme.js
import { LitElement, html, css } from 'lit';

class PortfolioSidebarTheme extends LitElement {
  static properties = {
    activeScreen: { type: String },
  };

  constructor() {
    super();
    this.activeScreen = 'screen-1';
  }

  static styles = css`
    :host {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    nav {
      width: 200px;
      background: #222;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2em 1em;
      gap: 1.5em;
    }
    nav button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      width: 100%;
      padding: 0.8em;
      font-size: 1em;
    }
    nav button:hover {
      background: #444;
    }
    main {
      flex: 1;
      overflow-y: auto;
      scroll-snap-type: y mandatory;
    }
    section {
      height: 100vh;
      scroll-snap-align: start;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2em;
      text-align: center;
    }
    .profile-pic {
      width: 200px;
      height: 200px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 1em;
    }
    .scroll-top-btn {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      background: #222;
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
      cursor: pointer;
    }
    .download-resume-btn {
      position: fixed;
      top: 1rem;
      right: 1rem;
      background: #222;
      color: white;
      text-decoration: none;
      font-size: 1rem;
      padding: 0.5em 1em;
      border-radius: 20px;
      border: 1px solid white;
      transition: background 0.3s;
    }
    .download-resume-btn:hover {
      background: #444;
    }
    iframe {
      border: none;
      max-width: 90%;
      height: 600px;
    }
    .about-text {
      max-width: 700px;
      font-size: 1.2rem;
      line-height: 1.8;
      padding: 0 1rem;
    }
  `;

  firstUpdated() {
    this._handleHashScroll();
    window.addEventListener('hashchange', () => this._handleHashScroll());
  }

  _scrollTo(id) {
    const el = this.renderRoot.querySelector(`#${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${id}`);
      this.activeScreen = id;
    }
  }

  _handleHashScroll() {
    const id = location.hash.replace('#', '');
    if (id) {
      setTimeout(() => {
        this._scrollTo(id);
        this.activeScreen = id;
      }, 100);
    }
  }

  _scrollToTop() {
    const main = this.renderRoot.querySelector('main');
    if (main) {
      main.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState(null, '', '#screen-1');
    }
  }

  render() {
    return html`
      <nav>
        <button @click="${() => this._scrollTo('screen-1')}">HOME</button>
        <button @click="${() => this._scrollTo('screen-2')}">SHORT RESUME</button>
        <button @click="${() => this._scrollTo('screen-3')}">EXPERIENCE</button>
        <button @click="${() => this._scrollTo('screen-4')}">ABOUT ME</button>
        <button @click="${() => this._scrollTo('screen-5')}">CONTACT</button>
      </nav>
      <main>
        <section id="screen-1">
          <img class="profile-pic" src="head%20shot%202.JPG" alt="Pedro Cardona" />
          <h1>Pedro Cardona</h1>
          <p>Enterprise Technology Integration | The Pennsylvania State University</p>
          <p>Intern at e-STEPS LLC</p>
        </section>

        <section id="screen-2">
          <h2>Resume</h2>
          <h3>Pedro J. Cardona-Acevedo</h3>
          <p>Moca, Puerto Rico | (787) 692-5225</p>
          <p>Email: pedrojuancardona@gmail.com / pjc5922@psu.edu</p>
          <h4>Value Offered</h4>
          <p>Optimizing system integration, automating operations, and driving digital transformation to maximize business success.</p>
          <h4>Experience</h4>
          <p><strong>e-STEPS LLC (Intern):</strong> SQL optimization, backend development.</p>
          <p><strong>HOD Investment Company:</strong> Materials acquisition tracking.</p>
          <p><strong>Advanced Hospice:</strong> Warehouse management and distribution.</p>
          <h4>Education</h4>
          <p>The Pennsylvania State University — B.S. Enterprise Technology Integration (Pursuing)</p>
          <h4>Skills</h4>
          <p>MS Office | English & Spanish | Strategic Planning</p>
        </section>

        <section id="screen-3">EXPERIENCE</section>

        <section id="screen-4">
          <h2>About Me</h2>
          <div class="about-text">
            I am a proud Puerto Rican student currently pursuing a degree in Enterprise Technology Integration at The Pennsylvania State University. 
            My passion lies in helping businesses leverage technology to innovate, grow, and succeed. 
            I aim to start my own technology analysis and consulting firm in Puerto Rico after graduation, 
            focusing on delivering modern digital transformation solutions for small and medium-sized businesses.
          </div>
        </section>

        <section id="screen-5">
          <h2>Contact</h2>
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSeLcAXG3_ujMc1NFBVQ7Whsh8M9CjtYpQm7Ocef7r4VEZzV1g/viewform?embedded=true" 
            title="Contact Form">
            Loading…
          </iframe>

          <div style="margin-top:2rem;">
            <p><strong>Or contact me directly:</strong></p>
            <p>Email: pedrojuancardona@gmail.com</p>
            <p>School: pjc5922@psu.edu</p>
            <p>Phone: (787) 692-5225</p>
            <p><a href="https://www.linkedin.com/in/pedro-cardona-973149291/" target="_blank">LinkedIn</a> | 
            <a href="https://github.com/PedroJuanCA" target="_blank">GitHub</a></p>
          </div>
        </section>
      </main>

      <button class="scroll-top-btn" @click="${this._scrollToTop}">↑</button>
      ${this.activeScreen === 'screen-2' ? html`
        <a class="download-resume-btn" href="./Pedro%20Cardona%20Master%20resume_S4.pdf" download>Download Resume</a>
      ` : ''}
    `;
  }
}

customElements.define('portfolio-sidebar-theme', PortfolioSidebarTheme);
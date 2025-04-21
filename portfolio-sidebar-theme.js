import { LitElement, html, css } from 'lit';

class PortfolioSidebarTheme extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      height: 100vh;
      overflow: hidden;
    }
    nav {
      width: 200px;
      background-color: #222;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1em;
    }
    nav button {
      background: none;
      border: none;
      color: inherit;
      padding: 1em;
      font-size: 1em;
      cursor: pointer;
      text-align: center;
      width: 100%;
      transition: background-color 0.3s;
    }
    nav button:hover {
      background-color: #444;
    }
    main {
      flex: 1;
      overflow-y: auto;
      scroll-snap-type: y mandatory;
      position: relative;
    }
    section {
      height: 100vh;
      scroll-snap-align: start;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      padding: 2em;
      box-sizing: border-box;
    }
    #screen-1 { background-color: #fff; color: #222; }
    #screen-2 { background-color: #eee; color: #222; }
    #screen-3 { background-color: #ddd; color: #222; }
    #screen-4 { background-color: #ccc; color: #222; }
    #screen-5 { background-color: #bbb; color: #222; }

    .profile-pic {
      width: 200px;
      height: 200px;
      object-fit: cover;
      border: 4px solid #222;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      margin-bottom: 1rem;
    }

    .contact-info {
      text-align: center;
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      width: 80%;
      max-width: 500px;
    }
    .contact-info a {
      color: #222;
      text-decoration: none;
      transition: all 0.3s ease;
      padding: 0.8rem;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.7);
      font-size: 1.1rem;
    }
    .contact-info a:hover {
      background: rgba(255, 255, 255, 0.9);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .scroll-top-btn {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      background-color: #222;
      color: white;
      border: none;
      border-radius: 999px;
      width: 48px;
      height: 48px;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      z-index: 999;
      transition: transform 0.3s;
    }
    .scroll-top-btn:hover {
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      :host {
        flex-direction: column;
      }
      nav {
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }
      nav button {
        width: auto;
        padding: 0.5em 1em;
      }
      .contact-info {
        width: 95%;
      }
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
    }
  }

  _handleHashScroll() {
    const id = location.hash.replace('#', '');
    if (id) {
      setTimeout(() => this._scrollTo(id), 100);
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
        <button @click="${() => this._scrollTo('screen-2')}">RESUME</button>
        <button @click="${() => this._scrollTo('screen-3')}">EXPERIENCE</button>
        <button @click="${() => this._scrollTo('screen-4')}">ABOUT</button>
        <button @click="${() => this._scrollTo('screen-5')}">CONTACT</button>
      </nav>
      <main>
        <section id="screen-1">
          <img class="profile-pic" 
               src="head%20shot%202.JPG" 
               alt="Pedro Cardona Professional Photo"
               onerror="this.src='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Crect fill=%22%23222%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22white%22 font-family=%22Arial%22 font-size=%2240%22 dy=%22.3em%22 text-anchor=%22middle%22 x=%22100%22 y=%22100%22%3EPC%3C/text%3E%3C/svg%3E'">
          <h1>Pedro Cardona</h1>
          <p>Enterprise Technology Integration | The Pennsylvania State University | Intern - Developer for e-STEPS LLC.</p>
        </section>
        <section id="screen-2">RESUME</section>
        <section id="screen-3">EXPERIENCE</section>
        <section id="screen-4">ABOUT</section>
        <section id="screen-5">
          <h2>CONTACT</h2>
          <div class="contact-info">
            <a href="mailto:pedrojuancardona@gmail.com">Personal Email: pedrojuancardona@gmail.com</a>
            <a href="mailto:pjc5922@psu.edu">School Email: pjc5922@psu.edu</a>
            <a href="tel:+17876925225">Phone: (787) 692-5225</a>
            <a href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            <a href="https://github.com/PedroJuanCA" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
          </div>
        </section>
      </main>
      <button class="scroll-top-btn" @click="${this._scrollToTop}">↑</button>
    `;
  }
}

customElements.define('portfolio-sidebar-theme', PortfolioSidebarTheme);
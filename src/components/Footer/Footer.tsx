import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-git">
        <a
          href="https://github.com/davidpinkevich"
          className="footer-git-person person__one"
          target="blank"
        >
          <img className="img" src="/images/git.png" alt="git" />
        </a>
        <a
          href="https://github.com/nkp1sss"
          className="footer-git-person person__two"
          target="blank"
        >
          <img className="img" src="/images/git.png" alt="git" />
        </a>
        <a
          href="https://github.com/1sak0v"
          className="footer-git-person person__three"
          target="blank"
        >
          <img className="img" src="/images/git.png" alt="git" />
        </a>
      </div>
      <div className="footer-rs">
        <a href="https://rs.school/" className="footer-rs-img" target="blank">
          <img src="/images/rs.svg" alt="rs school" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

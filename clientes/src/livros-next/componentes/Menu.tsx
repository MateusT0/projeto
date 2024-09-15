// components/Menu.tsx
import Link from 'next/link';

const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">Home</a>
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link href="/livro-lista">
                <a className="nav-link">Livros</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/livro-dados">
                <a className="nav-link">Livro Dados</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;

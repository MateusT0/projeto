// pages/index.tsx
import Head from 'next/head';
import Menu from '../componentes/Menu'; // Ajuste o caminho se necessário

const Home = () => {
  return (
    <>
      <Head>
        <title>Loja Next</title>
      </Head>
      <Menu />
      <main className="container">
        <h1>Página Inicial</h1>
      </main>
    </>
  );
};

export default Home;

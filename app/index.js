import Head from 'next/head';
import fs from 'fs';
import path from 'path';

export default function Home({ data }) {
  return (
    <div className="container">
      <Head>
        <title>Matrix Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{data.question}</h1>
        <div className="matrix">
          {data.matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((color, colIndex) => (
                <div
                  key={colIndex}
                  className="cell"
                  style={{ backgroundColor: color }}
                  onClick={() => alert(`You clicked ${color}`)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        h1 {
          margin-bottom: 2rem;
        }
        .matrix {
          display: flex;
          flex-direction: column;
        }
        .row {
          display: flex;
        }
        .cell {
          width: 50px;
          height: 50px;
          margin: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);

  return {
    props: {
      data,
    },
  };
}
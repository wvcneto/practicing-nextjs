import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';

import Head from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {  
  async function handleSum() {
    const math = (await import('../lib/math')).default;

    alert(math.sum(3, 4));
  }
  
  return (
    <div>
      <Head 
        title="Home" 
        shouldExcludeTitleSuffix={false} 
        image="boost.png"
      />
      <section>
        <Title>Recommended Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProducts => {
            return (
              <li key={recommendedProducts.id}>
                {recommendedProducts.title}
              </li>
            );
          })}
        </ul>
      </section>

      <button onClick={handleSum}>
        Sum(Dynamic Import)
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const reponse = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await reponse.json();

  return {
    props: {
      recommendedProducts
    }
  }
     
}

import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';
import Link from 'next/link'
import Head from '@/components/SEO';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { client } from '@/lib/prismic';
import { Document } from 'prismic-javascript/types/documents';

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {    
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
                <Link href={`/catalog/products/${recommendedProducts.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProducts.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    }
  }
     
}

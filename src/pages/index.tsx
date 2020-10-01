import { useState, useEffect } from 'react';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

export default function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/recommended').then(response => {
      response.json().then(data => {
        setRecommendedProducts(data);
      })
    })
  }, []);

  return (
    <div>
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
    </div>
  )
}

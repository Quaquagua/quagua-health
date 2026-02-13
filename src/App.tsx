import Header from './sections/Header';
import Hero from './sections/Hero';
import CategorySection from './sections/CategorySection';
import FeaturedPosts from './sections/FeaturedPosts';
import ProductRecommendations from './sections/ProductRecommendations';
import Newsletter from './sections/Newsletter';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CategorySection />
        <FeaturedPosts />
        <ProductRecommendations />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;

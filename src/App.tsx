import Header from './sections/Header';
import Hero from './sections/Hero';
import ProductRecommendations from './sections/ProductRecommendations'; // 위치 이동
import CategorySection from './sections/CategorySection';
import FeaturedPosts from './sections/FeaturedPosts';
import Newsletter from './sections/Newsletter';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductRecommendations /> {/* Hero 다음으로 이동 - 제품 먼저 노출! */}
        <CategorySection />
        <FeaturedPosts />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;

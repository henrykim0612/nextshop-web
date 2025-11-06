import DefaultLayout from '@/components/layouts/DefaultLayout';
import HeroSection from '@/components/sections/HeroSection';
import ShopCategorySection from '@/components/sections/ShopCategorySection';
import { FeatureSection } from '@/components/sections/FeatureSection';
import { FavoriteSection } from '@/components/sections/FavoriteSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <DefaultLayout>
      <HeroSection />
      <ShopCategorySection />
      <FeatureSection />
      <FavoriteSection />
      <CTASection />
    </DefaultLayout>
  );
}

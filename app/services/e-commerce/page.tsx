import Header from "@/components/layout/Header/Header";
import FooterSection from "@/components/layout/Footer/FooterSection";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";
import EcommerceHero from "@/components/services/e-commerce/EcommerceHero/EcommerceHero";
import EcommerceStatementSection from "@/components/services/e-commerce/EcommerceStatementSection/EcommerceStatementSection";
import EcommerceProcessSection from "@/components/services/e-commerce/EcommerceProcessSection/EcommerceProcessSection";
import EcommerceTechnologies from "@/components/services/e-commerce/EcommerceTechnologies/EcommerceTechnologies";
import EcommerceFeaturedWork from "@/components/services/e-commerce/EcommerceFeaturedWork/EcommerceFeaturedWork";

export default function EcommercePage() {
	return (
		<main data-page="e-commerce">
			<Header />
			<EcommerceHero />
            <EcommerceStatementSection />
			<EcommerceProcessSection />
			<EcommerceTechnologies />
			<EcommerceFeaturedWork />
			<ReviewsSection />
			<FooterSection />
		</main>
	);
}

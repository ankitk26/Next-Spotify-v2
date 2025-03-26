import { getCategories } from "@/actions/get-categories";
import CardItem from "@/components/card-item";
import CardItemGrid from "@/components/card-item-grid";

export const metadata = {
  title: "Spotify - Search",
};

export default async function BrowseCategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <h1>Browse Categories</h1>

      <CardItemGrid>
        {categories?.map((category) => (
          <CardItem
            key={category.id}
            altTitle={category.name}
            heading={category.name}
            id={category.id}
            images={category.icons}
            type="categories"
          />
        ))}
      </CardItemGrid>
    </>
  );
}

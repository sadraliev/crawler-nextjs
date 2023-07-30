import { Providers } from "@/shared/components/Providers";
import FilterList from "@/widgets/FilterList";

export default async function Home() {
  return (
    <Providers>
      <FilterList />
    </Providers>
  );
}

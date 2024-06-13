import { useParams } from "react-router-dom";
import { get_categorie } from "../api/products";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../components/Loader";
import toast from "react-hot-toast";
import iconSupport from "../assets/support.jpg";
import ItemBar from "../components/ItemBar";
import Slider from "../components/Slider";
import withScrollToTop from "../layouts/withScrollToTop";

function ItemPage() {
  const { category } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', category],
    queryFn: () => get_categorie(category || ''),
  });

  if (error) {
    toast.error("Hubo un problema al cargar la pagina!");
  }
  if (isLoading) return <Loader />;

  return (
    <div className="lg:px-32 px-16 overflow-hidden">
      <div className="grid-cols-[200pxminmax(900px,_2f)_100px]">
        <section className="py-20 relative transition-all duration-200 delay-200 animate-fade-down">
          <div className="lg:w-[45%]">
            <p className="text-gray-800 tracking-tighter text-[3em] font-bold">
              Shop iPhone
            </p>
          </div>
          <div className="lg:absolute gap-3 z-10 right-0 lg:top-24 md:flex-col">
            <div className="flex gap-3">
              <img src={iconSupport} className="w-9 h-9 mt-2" />
              <div className="mb-2">
                <p className="font-bold">Need shopping help?</p>
                <a href="" className="text-blue-700">
                  Ask a Specialist
                </a>
              </div>
            </div>
            <div className="flex">
              <div>
                <p className="font-bold">Visit an Apple Store</p>
                <a href="" className="text-blue-700">
                  Find one near you
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="flex gap-10 mx-auto text-lg tracking-tighter transition-all duration-200 delay-200 animate-fade-down">
        <ItemBar key={category} />
      </section>
      <section className="mt-16 transition-all duration-200 delay-200 animate-fade-right">
        <p className="text-gray-500 font-bold text-[1.7em]">
          <span className="text-gray-800">All models.</span> Take your pick
        </p>
        <div className="overflow-x-hidden">
          <div className="sticky top-0 pb-4 mt-4">
            <Slider products={data} category={category} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default withScrollToTop(ItemPage);

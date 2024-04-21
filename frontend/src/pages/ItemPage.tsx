import { useParams } from "react-router-dom";
import { get_categorie } from "../api/products";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../components/Loader";
import toast from "react-hot-toast";
import iconSupport from "../assets/support.jpg";
import ItemBar from "../components/ItemBar";
import Slider from "../components/Slider";
import { Product } from "../Interfaces";

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

  console.log(typeof(data))
  console.log(data)
  return (
    <div className="lg:px-32 px-16 overflow-hidden">
      <div className="mt-10 grid-cols-[200pxminmax(900px,_2f)_100px]">
        <section className="py-20 relative">
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
      <section className="flex gap-10 mx-auto text-lg tracking-tighter">
        <ItemBar key={category} />
      </section>
      <section className="mt-16">
        <p className="text-gray-500 font-bold text-[1.7em]">
          <span className="text-gray-800">All models.</span> Take your pick
        </p>
        <div className="overflow-x-hidden">
          <div className="sticky top-0 pb-4 mt-4">
            <Slider products={data} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ItemPage;

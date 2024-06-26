import { ChevronRightIcon } from "@heroicons/react/24/outline"

type CardInformationProps = {
    title: string
    content: string
    link: string
}

function CardInformation({title, content, link}: CardInformationProps) {
  return (
    <div className="w-2/5 h-72 rounded-xl flex-col bg-white p-10">
        <p className="text-3xl font-bold pb-4">{title}</p>
        <p className="text-gray-900 tracking-tighter">{content}</p>
        <p className="text-blue-500 cursor-pointer flex pt-4">{link} <ChevronRightIcon className="w-3 mt-1" /></p>
    </div>
  )
}

export default CardInformation
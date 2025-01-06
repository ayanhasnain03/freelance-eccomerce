import { SparklesText } from "../SparkleTexts"


const Stbtn = ({text}: {text: string}) => {
  return (
    <div className="relative mb-6 w-full">
    <h1 className="text-4xl font-bold font-bebas ml-8 text-gray-900">
   <SparklesText text={text} sparklesCount={6}  />
    </h1>
  </div>
  )
}

export default Stbtn
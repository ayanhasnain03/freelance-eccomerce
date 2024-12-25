import AnimText from "../AnimText"


const Stbtn = ({text}: {text: string}) => {
  return (
    <div className="relative mb-6 w-full">
    <div className="h-10 w-2 bg-primary-red absolute top-0 left-4"></div>
    <h1 className="text-4xl font-bold font-dancing ml-8 text-gray-900">
      <AnimText  text={text} fontSize="4xl"  svgStrokeWidth={4} // Thicker underline
  svgCurveHeight={8} // Higher curve for the underline
  underlinePosition={{ bottom: "-6px", left: "0%" }} />
    </h1>
  </div>
  )
}

export default Stbtn
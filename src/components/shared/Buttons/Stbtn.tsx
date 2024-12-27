import AnimText from "../AnimText"


const Stbtn = ({text}: {text: string}) => {
  return (
    <div className="relative mb-6 w-full">
    <h1 className="text-4xl font-bold font-dancing ml-8 text-gray-900">
      <AnimText  text={text} fontSize="4xl"  svgStrokeWidth={4} 
  svgCurveHeight={8} 
  underlinePosition={{ bottom: "-6px", left: "0%" }} />
    </h1>
  </div>
  )
}

export default Stbtn
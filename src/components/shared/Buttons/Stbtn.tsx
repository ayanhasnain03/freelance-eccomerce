

const Stbtn = ({text}: {text: string}) => {
  return (
    <div className="relative mb-6">
    <div className="h-10 w-2 bg-primary-red absolute top-0 left-4"></div>
    <h1 className="text-4xl font-bold font-dancing ml-8 text-gray-900">{text}</h1>
  </div>
  )
}

export default Stbtn
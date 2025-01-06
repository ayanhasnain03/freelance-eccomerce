
import { VelocityScroll } from './TextScroll'

const TextShared = () => {
  return (

    <VelocityScroll defaultVelocity={0.8} numRows={2} className="my-10">
    <div className="flex items-center gap-6">
      <img
        src="https://assets.ajio.com/medias/sys_master/root/20240716/B4Yq/6696ae226f60443f3151f6c0/-473Wx593H-467107801-black-MODEL.jpg"
        alt="Men's Clothing"
        className="w-16 h-16 object-cover rounded-lg mx-12"
      />
      <h2 className="text-lg md:text-2xl font-semibold">
        Men's Winter Collection
      </h2>
    </div>

    <div className="flex items-center gap-6">
      <img
        src="https://assets.ajio.com/medias/sys_master/root/20241211/xqpr/6758c0ff0f47f80c87edd970/-473Wx593H-700906205-beige-MODEL.jpg"
        alt="Women's Clothing"
        className="w-16 h-16 object-cover rounded-lg mx-12"
      />
      <h2 className="text-lg md:text-2xl font-semibold">
        Women's New Arrivals
      </h2>
    </div>

    <div className="flex items-center gap-6">
      <img
        src="https://assets.ajio.com/medias/sys_master/root/20241113/gKjM/67342d70f9b8ef490b1fe088/-473Wx593H-700308528-black-MODEL.jpg"
        alt="Kids' Clothing"
        className="w-16 h-16 object-cover rounded-lg mx-12"
      />
      <h2 className="text-lg md:text-2xl font-semibold">
        Adorable Kids' Outfits
      </h2>
    </div>

    <div className="flex items-center gap-6">
      <img
        src="https://assets.ajio.com/medias/sys_master/root/20241212/ze3C/675afc760f47f80c87f4fd01/-473Wx593H-700915291-teal-MODEL.jpg"
        alt="Accessories"
        className="w-16 h-16 object-cover rounded-lg mx-12"
      />
      <h2 className="text-lg md:text-2xl font-semibold">
        Accessories to Match
      </h2>
    </div>

    <div className="flex items-center gap-6">
      <img
        src="https://assets.ajio.com/medias/sys_master/root/20241118/csNp/673b6cbbc148fa1b30d4a51c/-473Wx593H-700772623-wine-MODEL.jpg"
        alt="Seasonal Sale"
        className="w-16 h-16 object-cover rounded-lg mx-12"
      />
      <h2 className="text-lg md:text-2xl font-semibold">
        Up to 70% Off - Limited Time!
      </h2>
    </div>
  </VelocityScroll>
  )
}

export default TextShared
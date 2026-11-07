import React from 'react'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }

const allImages = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const getImage = (prefix, number) => {
  const pattern = new RegExp(`/${prefix}s?${number}\\.`, 'i')
  const key = Object.keys(allImages).find((path) => pattern.test(path))
  return key ? allImages[key] : null
}

const menu = [
  {
    title: 'Starters',
    tagline: 'To begin your experience',
    prefix: 'starter',
    items: [
      { name: 'Tuna Kinilaw', price: 420, desc: 'Fresh tuna, coconut vinegar, calamansi, ginger, and coconut cream.' },
      { name: 'Crispy Sisig Bites', price: 380, desc: 'Tender pork belly, caramelized onions, chili, and calamansi aioli.' },
      { name: 'Golden Prawn Tempura', price: 450, desc: 'Lightly battered prawns with spiced mango dipping sauce.' },
      { name: 'Heritage Lumpia', price: 320, desc: 'Delicate crispy rolls filled with seasoned pork and vegetables.' },
      { name: 'Wild Mushroom Velouté', price: 390, desc: 'Creamy mushroom soup finished with truffle oil and toasted brioche.' },
      { name: 'Seared Scallops', price: 580, desc: 'Pan-seared scallops, cauliflower purée, and citrus butter.' },
    ],
  },
  {
    title: 'Main Courses',
    tagline: 'The heart of the experience',
    prefix: 'main',
    items: [
      { name: 'Wagyu Beef Tenderloin', price: 1850, desc: 'Premium beef, potato purée, seasonal vegetables, and red wine reduction.' },
      { name: 'Signature Crispy Pata', price: 1250, desc: 'Slow-cooked pork knuckle with a crisp golden exterior, served with house-made vinegar sauce.' },
      { name: 'Pan-Seared Salmon', price: 980, desc: 'Salmon fillet, lemon butter sauce, asparagus, and saffron rice.' },
      { name: 'Heritage Chicken Inasal', price: 780, desc: 'Charcoal-grilled chicken, annatto butter, garlic rice, and pickled vegetables.' },
      { name: 'Seafood Kare-Kare', price: 1150, desc: 'Prawns, squid, seasonal vegetables, and rich peanut sauce with bagoong on the side.' },
      { name: 'Glazed Duck Breast', price: 1380, desc: 'Roasted duck breast, orange reduction, roasted potatoes, and seasonal greens.' },
    ],
  },
  {
    title: 'Desserts',
    tagline: 'A sweet ending',
    prefix: 'dessert',
    items: [
      { name: 'Ube Crème Brûlée', price: 320, desc: 'Silky purple yam custard with a caramelized sugar crust.' },
      { name: 'Midnight Chocolate Fondant', price: 380, desc: 'Warm chocolate cake with a molten center and vanilla bean ice cream.' },
      { name: 'Golden Mango Panna Cotta', price: 340, desc: 'Vanilla panna cotta, fresh Philippine mangoes, and mango coulis.' },
      { name: 'Caramelized Leche Flan', price: 290, desc: 'Traditional Filipino custard with silky caramel and gold leaf decoration.' },
      { name: 'Ube Sans Rival', price: 350, desc: 'Layers of ube buttercream, crisp meringue, and roasted cashews.' },
      { name: 'Deconstructed Halo-Halo', price: 390, desc: 'Shaved milk ice, ube, leche flan, sweetened fruits, and house-made ice cream.' },
    ],
  },
  {
    title: 'Beverages',
    tagline: 'Crafted refreshments',
    prefix: 'drink',
    items: [
      { name: 'Calamansi Mint Cooler', price: 220, desc: 'Fresh calamansi, mint, sparkling water, and honey.' },
      { name: 'Tropical Gold', price: 250, desc: 'Mango purée, passion fruit, and citrus.' },
      { name: 'Signature Ube Latte', price: 240, desc: 'Espresso, creamy milk, and house-made ube blend.' },
      { name: 'Ceremonial Matcha', price: 260, desc: 'Premium Japanese matcha with steamed or chilled milk.' },
      { name: 'Roselle Hibiscus Tea', price: 210, desc: 'Floral hibiscus infusion with honey and a hint of lemon.' },
      { name: 'Strawberry Rosé Sparkler', price: 270, desc: 'Strawberry purée, rose syrup, and sparkling water. Non-alcoholic.' },
    ],
  },
]

function Menu() {
  return (
    <section id="menu" className="bg-[#FAF7F2] border-t border-[#E8E3DB] px-6 md:px-16 py-16">
      <div className="max-w-6xl w-full mx-auto">

        <div className="text-center mb-14">
          <p className="text-[#C99B52] text-xs tracking-[4px] mb-4">
            OUR MENU
          </p>
          <h2 className="text-[#26221E] text-4xl md:text-5xl mb-4" style={serif}>
            A Curated Selection
          </h2>
          <p className="text-[#756D64] text-sm md:text-base">
            Seasonal dishes, crafted to share.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {menu.map((category) => (
            <div key={category.title}>
              <div className="pb-3 mb-6 border-b border-[#E8E3DB]">
                <h3 className="text-[#26221E] text-2xl" style={serif}>
                  {category.title}
                </h3>
                <p className="text-[#C99B52] text-xs tracking-[2px] mt-1 uppercase">
                  {category.tagline}
                </p>
              </div>

              <div className="flex flex-col gap-8">
                {category.items.map((item, index) => {
                  const image = getImage(category.prefix, index + 1)

                  return (
                    <div key={item.name}>
                      {image ? (
                        <img
                          src={image}
                          alt={item.name}
                          className="w-full aspect-[4/3] object-cover rounded-[24px]"
                        />
                      ) : (
                        <div className="w-full aspect-[4/3] rounded-[24px] bg-[#F1EFEC]" />
                      )}

                     <div className="flex items-start justify-between gap-3 mt-4 lg:min-h-[3rem]">
                         <h4 className="text-[#26221E] text-base font-medium">
                               {item.name}
                         </h4>
                    <span className="text-[#C99B52] font-semibold text-base whitespace-nowrap">
                              ₱{item.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-[#756D64] text-sm leading-relaxed mt-1 lg:min-h-[4.5rem]">
                         {item.desc}
                    </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Menu
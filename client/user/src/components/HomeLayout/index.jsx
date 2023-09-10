import Header from '../HeaderLayout';
import Footer from '../FooterLayout';

export default function Home() {
  const user = JSON.parse(localStorage.getItem("UserInfo"));

    return (
      <><Header></Header>
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              The Perfect Pair Awaits You.
              </h1>
              <p className="mt-4 text-xl text-gray-500">
              Discover a curated collection of eyewear that blends fashion and function seamlessly. At Shop, we believe that the perfect pair of glasses can not only enhance your vision but also elevate your style.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                    
                      <><div  className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://images.pexels.com/photos/2811088/pexels-photo-2811088.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt=""
                            className="h-full w-full object-cover object-center" />
                        </div>
                      </div><div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              src="https://images.pexels.com/photos/2119500/pexels-photo-2119500.jpeg?auto=compress&cs=tinysrgb&w=600"
                              alt=""
                              className="h-full w-full object-cover object-center" />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              src="https://images.pexels.com/photos/975668/pexels-photo-975668.jpeg?auto=compress&cs=tinysrgb&w=600"
                              alt=""
                              className="h-full w-full object-cover object-center" />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              src="https://images.pexels.com/photos/1457824/pexels-photo-1457824.jpeg?auto=compress&cs=tinysrgb&w=600"
                              alt=""
                              className="h-full w-full object-cover object-center" />
                          </div>
                        </div><div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              src="https://images.pexels.com/photos/2748239/pexels-photo-2748239.jpeg?auto=compress&cs=tinysrgb&w=600"
                              alt=""
                              className="h-full w-full object-cover object-center" />
                          </div>
                          <div className="h-64 w-44 overflow-hidden rounded-lg">
                            <img
                              src="https://images.pexels.com/photos/3374436/pexels-photo-3374436.jpeg?auto=compress&cs=tinysrgb&w=600"
                              alt=""
                              className="h-full w-full object-cover object-center" />
                          </div>
                        </div></>
                     
                    
                    </div>
                    
                  </div>
                </div>

                <a
                  href="#"
                  className="inline-block rounded-md border border-transparent bg-gray-800 px-8 py-3 text-center font-medium text-white hover:bg-gray-700"
                >
                  Shop Collection
                </a>
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
      <Footer></Footer></>
    )
  }
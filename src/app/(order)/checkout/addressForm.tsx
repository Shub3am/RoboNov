export default function addressForm({name, email}) {
    return (<div className="p-6 bg-gray-100 flex items-center justify-center">
    <div className="container w-screen lg:w-3/5 mx-auto">
  
    <form>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Billing Details</p>
              <p>Please fill out all the fields.</p>
            </div>
  
            <div className="lg:col-span-2">
              <div className="text-sm">
                <div className="md:col-span-5">
                  <label htmlFor="full_name">Full Name</label>
                  <input type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue={name} required/>
                </div>
  
                <div className="md:col-span-5">
                  <label htmlFor="email">Email Address</label>
                  <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="email@domain.com" defaultValue={email} required/>
                </div>
  
                <div className="md:col-span-3">
                  <label htmlFor="address">Address / Street</label>
                  <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" required />
                </div>
  
                <div className="md:col-span-2">
                  <label htmlFor="city">City</label>
                  <input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" required/>
                </div>
                <div className="md:col-span-2">
                <label for="phone">Enter your phone number:</label>
  <input type="tel" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
                </div>
  
                <div className="md:col-span-2">
                  <label htmlFor="country">Country / region</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  required/>
                    <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                      <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    <button tabIndex="-1" htmlFor="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                      <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                    </button>
                  </div>
                </div>
  
                <div className="md:col-span-2">
                  <label htmlFor="state">State / province</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input name="state" id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" required />
                    <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                      <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    <button tabIndex="-1" htmlFor="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                      <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                    </button>
                  </div>
                </div>
  
                <div className="md:col-span-1">
                  <label htmlFor="zipcode">Zipcode</label>
                  <input type="text" name="zipcode" id="zipcode" className="transition-all flex  items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" required/>
                </div>
  
                <div className="md:col-span-5">
                  <div className="inline-flex items-center">
                    <input type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                    <label htmlFor="billing_same" className="ml-2">My billing address is different than above.</label>
                  </div>
                </div>
  
        
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                  </div>
                </div>
  
              </div>
            </div>
            
          </div>
        </div></form>
  
  
    </div>
  </div>)

}
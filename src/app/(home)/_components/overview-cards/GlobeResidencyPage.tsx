export default function GlobeResidencyFormUI() {
  return (
    <main className="min-h-screen pt-4">
      <div className="mx-auto shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Globe Residency House</h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Basic Info */}
          <div>
            <label className="block font-semibold mb-1">Property Name</label>
            <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="Luxury Towers" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea className="w-full border rounded-lg px-4 py-3" rows={3} placeholder="Premium residential towers..." />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-1">Address</label>
            <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="123 Main St" />
          </div>

          <div>
            <label className="block font-semibold mb-1">City</label>
            <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="New York" />
          </div>

          <div>
            <label className="block font-semibold mb-1">State</label>
            <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="NY" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Country</label>
            <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="USA" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Latitude</label>
            <input type="number" step="any" className="w-full border rounded-lg px-4 py-3" placeholder="40.7128" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Longitude</label>
            <input type="number" step="any" className="w-full border rounded-lg px-4 py-3" placeholder="-74.0060" />
          </div>

          {/* Developer Info */}
          <div>
            <label className="block font-semibold mb-1">Developer Name</label>
            <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="Prestige Developers" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Developer Description</label>
            <textarea className="w-full border rounded-lg px-4 py-3" rows={3} placeholder="Leading luxury real estate developer" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Developer Website</label>
            <input type="url" className="w-full border rounded-lg px-4 py-3" placeholder="https://prestigedevelopers.com" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Developer Logo URL</label>
            <input type="url" className="w-full border rounded-lg px-4 py-3" placeholder="https://example.com/logo.png" />
          </div>

          {/* Project Details */}
          <div>
            <label className="block font-semibold mb-1">Project Status</label>
            <select className="w-full border rounded-lg px-4 py-3">
              <option>under_construction</option>
              <option>completed</option>
              <option>planning</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Category</label>
            <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="residential" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Subcategory</label>
            <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="apartment" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Featured</label>
            <select className="w-full border rounded-lg px-4 py-3">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Start Date</label>
            <input type="date" className="w-full border rounded-lg px-4 py-3" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Completion Date</label>
            <input type="date" className="w-full border rounded-lg px-4 py-3" />
          </div>

          {/* Area & Pricing */}
          <div>
            <label className="block font-semibold mb-1">Total Area (sq.ft)</label>
            <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="100000" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Price Range - Min</label>
            <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="800000" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Price Range - Max</label>
            <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="2500000" />
          </div>

          {/* Stats */}
          <div>
            <label className="block font-semibold mb-1">Total Units</label>
            <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="50" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Sold Units</label>
            <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="30" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Reserved Units</label>
            <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="5" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Available Units</label>
            <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="15" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Views</label>
            <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="1200" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Inquiries</label>
            <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="85" />
          </div>

          {/* Images */}
          <div>
            <label className="block font-semibold mb-1">Main Image URL</label>
            <input type="url" className="w-full border rounded-lg px-4 py-3" placeholder="https://example.com/image.jpg" />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Gallery Images (comma separated)</label>
            <textarea className="w-full border rounded-lg px-4 py-3" rows={2} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
          </div>

          {/* Amenities */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Amenities (comma separated)</label>
            <textarea className="w-full border rounded-lg px-4 py-3" rows={2} placeholder="Swimming Pool, Rooftop Garden" />
          </div>

          {/* Token Info */}
          <div>
            <label className="block font-semibold mb-1">Token Name</label>
            <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="GlobeHouseToken" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Token Symbol</label>
            <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="GHT" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Token Supply</label>
            <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="1" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Price Per Token (PKR)</label>
            <input type="number" className="w-full border rounded-lg px-4 py-3" placeholder="120000000" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Wallet Address</label>
            <input type="text" className="w-full border rounded-lg px-4 py-3" placeholder="User's Phantom Wallet Address" />
          </div>

        </form>

        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}

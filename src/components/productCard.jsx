export default function ProductCard(props) {
    const product = props.product;

    return (
        <div className="w-[300px] h-[450px] bg-white shadow-lg flex flex-col rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:scale-105 ease-in-out animate-fade-in">
            {/* Header - Product Image with Badge */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={product.productImages[0] || "https://via.placeholder.com/300"}
                    alt={product.productName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.salePrice < product.labelPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        SALE {Math.round((1 - product.salePrice / product.labelPrice) * 100)}%
                    </div>
                )}
                {!product.isAvailable && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg bg-red-500 px-3 py-1 rounded">SOLD OUT</span>
                    </div>
                )}
            </div>

            {/* Body - Product Info */}
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{product.productName}</h3>
                    <div className="flex flex-col items-end">
                        {product.salePrice < product.labelPrice ? (
                            <>
                                <span className="text-gray-500 line-through text-sm">${product.labelPrice.toFixed(2)}</span>
                                <span className="text-red-500 font-bold">${product.salePrice.toFixed(2)}</span>
                            </>
                        ) : (
                            <span className="text-gray-800 font-bold">${product.labelPrice.toFixed(2)}</span>
                        )}
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{product.productDescription}</p>

                <div className="mt-auto">
                    <div className="flex items-center mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                            {product.stock > 10 ? `${product.stock} left` : 'Low stock'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer - Action Buttons */}
            <div className="border-t border-gray-200 p-3 bg-gray-50">
                <button
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${product.isAvailable
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
                    disabled={!product.isAvailable}
                >
                    {product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div >
    );
}
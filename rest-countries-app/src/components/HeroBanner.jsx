// HeroBanner.jsx
export default function HeroBanner() {
    return (
      <div
        className="w-full h-[300px] md:h-[400px] bg-center bg-cover flex items-center justify-center relative"
        style={{
          backgroundImage: `url('https://i.postimg.cc/3wMzSqmF/shutterstock-1131111662.jpg')`,
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40" />
        <div className="relative z-10 flex flex-col items-center">
          {/* Breadcrumb */}
          <div className="mb-2 text-white text-sm">
            <span className="opacity-80">Home &gt; </span>
            <span className="opacity-100 font-semibold">Countries and Details List</span>
          </div>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-lg mb-2">
            Countries and Areas
          </h1>
        </div>
      </div>
    );
  }
  
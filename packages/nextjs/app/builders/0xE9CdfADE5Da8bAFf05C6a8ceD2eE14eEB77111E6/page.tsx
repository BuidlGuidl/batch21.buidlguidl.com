import Image from "next/image";

export default function BuilderPage() {
  const builder = {
    name: "sye",
    address: "0xE9CdfADE5Da8bAFf05C6a8ceD2eE14eEB77111E6",
    bio: "Builder @BuidlGuidl | Learning Solidity, ML & Web3. luvv exploring new shit!",
    avatar: "buidlguidl.jpg",
    socials: {
      twitter: "https://x.com/syethesc1entist",
      github: "https://github.com/syethescientist",
      instagram: "https://instagram.com/syethescientist",
    },
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 space-y-6">
      {/* Avatar */}
      <div className="w-28 h-28 relative">
        <Image
          src={builder.avatar}
          alt={`${builder.name}'s avatar`}
          fill
          className="rounded-full object-cover border border-gray-700"
        />
      </div>

      {/* Name + Address */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold">{builder.name}</h1>
        <p className="text-gray-400 text-sm mt-1">{builder.address}</p>
      </div>

      {/* Bio */}
      <p className="max-w-md text-center text-gray-300">{builder.bio}</p>

      {/* Social Links */}
      <div className="flex space-x-4">
        {Object.entries(builder.socials).map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </a>
        ))}
      </div>
    </main>
  );
}

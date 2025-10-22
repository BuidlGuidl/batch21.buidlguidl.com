import Image from "next/image";

interface ProfileAvatarProps {
  src: string;
  alt?: string;
  size?: number;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ src, alt = "Profile avatar", size = 96 }) => {
  return (
    <div className="rounded-full overflow-hidden border border-[#f7b733]/40" style={{ width: size, height: size }}>
      <Image src={src} alt={alt} width={size} height={size} className="object-cover w-full h-full" priority />
    </div>
  );
};

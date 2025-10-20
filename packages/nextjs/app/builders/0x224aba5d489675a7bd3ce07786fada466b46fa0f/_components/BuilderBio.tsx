interface BuilderBioProps {
  bio: string;
}

export const BuilderBio = ({ bio }: BuilderBioProps) => {
  return (
    <div className="bg-base-100 rounded-3xl shadow-md p-6">
      <h2 className="text-xl font-bold text-base-content mb-4">Bio</h2>
      <div className="w-full h-px bg-base-300 mb-4"></div>
      <p className="text-base-content/80 leading-relaxed">{bio}</p>
    </div>
  );
};

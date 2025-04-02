export const CategoryBox = (props: { name: string; size: number }) => {
  const { name, size } = props;
  return (
    <div className="bg-white border rounded-full text-black flex items-center px-3 py-2 gap-2">
      {name}
      <p className="bg-black text-white rounded-full px-2">{size}</p>
    </div>
  );
};

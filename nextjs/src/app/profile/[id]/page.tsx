export default function Profile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>
        Profile id{" "}
        <span className="p-2 ml-2 rounded bg-orange-400 text-black">
          {params.id}
        </span>
      </h1>
    </div>
  );
}

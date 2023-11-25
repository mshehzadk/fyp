import Link from "next/link";

const Button = ({content}:any) => {
    return (
        <button className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 px-4 py-2 rounded-md text-md font-semibold text-gray-100 ">
            <Link href="/urduvideo">
           {content}
            </Link>
        </button>
    );
};

export default Button;



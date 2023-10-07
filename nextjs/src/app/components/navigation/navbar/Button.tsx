import Link from "next/link";

const Button = ({content}:any) => {
    return (
        <button className="h-10 border-2 border-black shadow-inner hover:bg-black hover:text-white rounded-full bg-white font-bold px-8">
            <Link href="/login">
           {content}
            </Link>
        </button>
    );
};

export default Button;

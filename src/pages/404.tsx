export default function Custom404() {
    return (
        <div className="grid h-full w-full place-items-center">
            <h1 className="spicy bg-conic-dark bg-[size:800%+800%] bg-no-repeat text-center">
                404
            </h1>{" "}
            <h2 className="flex flex-wrap items-center justify-center gap-x-12">
                <span className="spicy bg-conic-dark bg-[size:800%+800%] bg-no-repeat text-center uppercase">
                    Page
                </span>
                <span className="spicy bg-conic-dark bg-[size:800%+800%] bg-no-repeat text-center uppercase">
                    Not
                </span>
                <span className="spicy bg-conic-dark bg-[size:800%+800%] bg-no-repeat text-center uppercase">
                    Found
                </span>
            </h2>
        </div>
    );
}

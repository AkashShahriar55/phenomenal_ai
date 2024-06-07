import { inter } from "@/app/fonts"


export interface AssetItemData{
    id:string,
    name:string,
    thumbnail:string,
    createdAt:string,
}



const AssetItem = ({ lastItem }: { lastItem?: boolean }) => {
    return (
        <>
            <div className="relative py-3 ">
                <div className="w-full px-5 py-2 flex justify-between hover:bg-[#FF000026] border border-transparent hover:border-[#FF0000] cursor-pointer">
                    <div className="flex gap-4 items-center">
                        <input
                            type="checkbox"
                            className="text-white border-white bg-transparent"
                        />
                        <img className="rounded-full border border-white size-10 mask mask-circle" src="/images/logout_bg.png" />
                        <p className="text-white">
                            Project Name
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-white">
                            3 Hours Ago
                        </p>
                        <button className="w-20 flex justify-end">
                            <img className="w-5 h-full" src="/images/three-dot-icon.svg" />
                        </button>
                    </div>
                </div>
                {!lastItem &&
                    <div className=" absolute h-px w-full bottom-0 px-5">
                        <div className="h-full w-full bg-[#777777] "></div>
                    </div>
                }

            </div>
        </>
    )
}


export default AssetItem
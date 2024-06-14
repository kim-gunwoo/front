import { dateAtom } from "@/atom/form"
import { useRecoilValue, useResetRecoilState } from "recoil"

export default function Date() {
    const date = useRecoilValue(dateAtom);
    const resetDate = useResetRecoilState(dateAtom);
    
    return <div>
        {date.toLocaleString()}
        <button onClick={resetDate}>
            reset Date
        </button>
    </div>
}

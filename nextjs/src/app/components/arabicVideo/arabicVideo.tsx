/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function arabicVideo() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <div className="ArabicVideo" >
                {isLoading && <p>Loading...</p>}
                <video width="320" height="240" controls
                    
                    onLoadStart={() => setIsLoading(true)}
                    onLoadedData={() => setIsLoading(false)}
                    src="http://localhost:8080/get_arabicVideo">
                    Your browser does not support the video tag.
                </video>

            </div>
            <div style={{ display: 'flex' }}>
                <Link href='/arabicTranslation' style={{ flex: '1', textAlign: 'right' }}>
                    <div>Arabic Translation</div>
                </Link>
                <Link href='/arabicVideo' style={{ flex: '1', textAlign: 'left' }}>
                    <div>   Arabic Video</div>
                </Link>
            </div>
        </div>

    )
}
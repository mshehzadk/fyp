/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { set } from "mongoose";

export default function arabicVideo() {
    const [isLoading, setIsLoading] = useState(false);


    const Download = () => {
        fetch("http://localhost:8080/get_arabicVideo", {
            method: 'GET',
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.setAttribute('download', 'test.video');
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });
    }
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
                {!isLoading &&
                    <button onClick={Download} style={{ flex: '1', textAlign: 'left' }}>
                        Download Video
                    </button>
                }
            </div>
        </div>

    )
}
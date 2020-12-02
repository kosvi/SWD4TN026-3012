import React from 'react';
// https://www.npmjs.com/package/svg-loaders-react
import { ThreeDots, Bars } from 'svg-loaders-react';

export default function Loading(props) {

    if (props.message) {
        return (
            <div>
                <p style={{fontSize: "2em"}}>{props.message}</p>
                <Bars stroke="#000000" />
            </div>
        )
    }
    return (
        <div>
            <ThreeDots stroke="#000000" />
        </div>
    )
}
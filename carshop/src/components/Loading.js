import React from 'react';
import { ThreeDots, SpinningCircles } from 'svg-loaders-react';

export default function Loading(props) {

    if (props.message) {
        return (
            <div>
                <p>{props.message}</p>
                <SpinningCircles />
            </div>
        )
    }
    return (
        <div>
            <ThreeDots stroke="#000000" />
        </div>
    )
}